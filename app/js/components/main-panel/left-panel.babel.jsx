import { h, Component } from 'preact';
const CLASSES = require('../../../css/blocks/left-panel.postcss.css.json');
require('../../../css/blocks/left-panel');

import ToolsPanel from '../tools-panel/index';

class LeftPanel extends Component {
  render () {
    const {state} = this.props;

    return (
      <div className={CLASSES['left-panel']}>
        <ToolsPanel state={state.controls} />
      </div>
    );
  }
}

export default LeftPanel;
