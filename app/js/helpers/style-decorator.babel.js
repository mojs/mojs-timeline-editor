import isString from './is-string';
import builder from './decorators/builder';
import refsFunction from './decorators/refs';
import classNamesFunction from './decorators/class-names';

/* Decorator: `classNames`.
    Overrides clean class names with CSS Modules `hash` classes.
    @param {CLASSES} CSS Modules hash classes map
    @sample:
      @classNames(CLASSES)
      class SomeComponent extends Component {
        render() {
          return (<div className="some-class" />);
        }
      }
      // `some-class` will be overwritten with `hash` from the `CLASSES`
*/
const classNamesDecorator = function classNamesDecorator(CLASSES) {
  const fun = classNamesFunction(CLASSES);
  const decorator = builder([fun]);
  decorator.__decorFunction = fun;
  return decorator;
};
export {classNamesDecorator as classNames};

/* Decorator: `refs`.
    Overrides clean string `_refs` with reference to the rendered element
    @sample:
      @refs
      class SomeComponent extends Component {}
*/
const refsDecorator = builder([refsFunction]);
refsDecorator.__decorFunction = refsFunction;
export {refsDecorator as refs};

/* Decorator: `all`.
    Includes all decorators at once.
    @sample:
      @all(CLASSES)
      class SomeComponent extends Component {}
*/
export function all(CLASSES) {
  return builder([classNamesFunction(CLASSES), refsFunction]);
}

/* Decorator: `compose`.
    Composes decorators you need into one.
    @sample:
      @compose(classNames(CLASSES), refs)
      class SomeComponent extends Component {}
*/
export function compose(...decorators) {
  if (decorators.length === 0) { return function id(arg) { return arg; }; }

  return builder(decorators.map( item => item.__decorFunction ));
}
