import isString from '../is-string';

const pushChildren = (item, stack) => {
  if (!item || !item.children) { return; }

  const {children} = item;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (!child.__isDecoratorApplied && !isString(child)) { stack.push(child); }
  }
};

/* Function to apply hash name classes to the rendered VNode tree. */
const applyDecorators = function applyDecorators(renderResult, funs=[]) {
  if (typeof renderResult !== 'object' || renderResult == null) { return; }

  const stack = [renderResult];
  while (stack.length > 0) {
    const item = stack.pop();
    if (item.__isDecoratorApplied || isString(item)) { continue; }

    for (let i = 0; i < funs.length; i++) {
      funs[i].call(this, item.attributes);
    }

    item.__isDecoratorApplied = true;
    pushChildren(item, stack);
  }

  return renderResult;
};

const builder = (functions) => {
  return (Component) => {
    return class StyledComponent extends Component {
      render() {
        // get original render
        let renderResult = super.render();
        // apply functions
        applyDecorators.call(this, renderResult, functions);
        return renderResult;
      }
    };
  };
};

export default builder;
