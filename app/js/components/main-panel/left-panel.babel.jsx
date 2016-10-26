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
