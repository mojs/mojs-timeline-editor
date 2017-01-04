
/* Function to parse a string and suppress `classNames` with `hash names`
   from the `CLASSES`. If there is no such `hash name` - leave the className
   as is.
*/
const overrideClass = (attrs, CLASSES) => {
  if (!attrs.class) { return; }
  const string = attrs.class.trim();
  const split = string.split(' ');

  let str = '';
  for (let i = 0; i < split.length; i++) {
    const className = split[i];
    if (className) {
      const hash = CLASSES[className];
      str += `${(hash == null) ? className : hash} `;
    }
  }
  attrs.class = str;
};

/* Function to override string `ref` with automatic function. */
const overrideRefs = function overrideRefs(attrs, CLASSES) {
  const {ref} = attrs;
  if (!ref || typeof ref === 'function') { return; }

  if (typeof ref === 'string') { attrs.ref = el => this[ref] = el; }
};

/* Function to apply hash name classes to the rendered VNode tree. */
const applyAttributes = function applyAttributes(renderResult, CLASSES) {
  if (typeof renderResult !== 'object' || renderResult == null) { return; }
  overrideClass(renderResult.attributes, CLASSES);
  overrideRefs.call(this, renderResult.attributes, CLASSES);

  const {children=[]} = renderResult;
  for (let i = 0; i < children.length; i++) {
    applyAttributes.call(this, children[i], CLASSES);
  }

  return renderResult;
};

// decorator to automatically apply hash classes instead of common ones.
export default (CLASSES) => {
  return (Component) => {
    return class StyledComponent extends Component {
      render() {
        let renderResult = super.render();
        renderResult = applyAttributes.call(this, renderResult, CLASSES);
        return renderResult;
      }
    };
  };
};
