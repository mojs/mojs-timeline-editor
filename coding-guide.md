# Project Coding Guides and Tips

## Common Rules

 - **maximum line length** should be < 80
 - **indentation** should be 2 spaces
 - **trim trailing whitespace** it would be great, if your IDE/text editor automatically trim trailing whitespaces

## JS

  - all variable declarations should have their **own variable keyword**, e.g.
    ```javascript
    // bad
    const className = CLASSES['main-panel'],
      isHiddenClassName = this._calcHiddenClassName(),
      isResizingClassName = this.state.isResizing ? CLASSES['main-panel--is-resizing'] : '';


    // good
    const className = CLASSES['main-panel'];
    const isHiddenClassName = this._calcHiddenClassName();
    const isResizingClassName = this.state.isResizing ? CLASSES['main-panel--is-resizing'] : '';
    ```

- all **private methods** should be declared **with underscore** in front of the method name
    ```javascript
    // bad
    toggleVisibility() {
      ...
    }


    // good
    _toggleVisibility() {
      ...
    }
    ```

## Preact

- All **components** should be created as **ES6 classes** which extend from preact.Component or **Pure functions**
    ```javascript
    // good
    import { h, Component } from 'preact';

    class LeftPanel extends Component {
      render () {
        return (
          <div>LeftPanel</div>
        );
      }
    }

    export default LeftPanel;


    // good
    import { h } from 'preact';

    const LeftPanel = () => {
      return (
        <div>LeftPanel</div>
      );
    };

    export default LeftPanel;
    ```

- as css-modules are used, you need to require both .postcss.css.json and
 .post.css(file extension can be omitted) files to make magic happens
    ```javascript
    // good
    import { h, Component } from 'preact';
    const CLASSES = require('../../../css/blocks/left-panel.postcss.css.json');
    require('../../../css/blocks/left-panel');

    class LeftPanel extends Component {
      render () {
        return (
          <div className={CLASSES['left-panel']}></div>
        );
      }
    }

    export default LeftPanel;
    ```

- it's preferred to use round braces arround JSX in render()
    ```javascript
    // bad
    class RightPanel extends Component {
      render () {
        return <div className={CLASSES['right-panel']}>
                 <HideButton {...this.props}/>
                 <ResizeHandle {...this.props}/>
               </div>
      }
    }


    // good
    class RightPanel extends Component {
      render () {
        return (
          <div className={CLASSES['right-panel']}>
            <HideButton {...this.props}/>
            <ResizeHandle {...this.props}/>
          </div>
        );
      }
    }
    ```

- **@bind** You can bind context of any method by means of a decorator.
    ```javascript
    // bad
    import { h, Component } from 'preact';
    class MainPanel extends Component {
      constructor(props) {
        super(props);
        this.state = { isPlayerPassed: true };

        this._toggleVisibility = this._toggleVisibility.bind(this);
      }

      ...
    }


    // good
    import { h, Component } from 'preact';
    import { bind } from 'decko';

    class MainPanel extends Component {
      constructor(props) {
        super(props);
        this.state = { isPlayerPassed: true };
      }

      @bind
      _toggleVisibility() {
        this.setState({ isHidden: !this.state.isHidden });
      }

      ...
    }
    ```

*Cheers!*
