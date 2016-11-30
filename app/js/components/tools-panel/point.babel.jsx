import { h, Component } from 'preact';

const CLASSES = require('../../../css/blocks/tools-panel.postcss.css.json');
require('../../../css/blocks/tools-panel');

class ToolsPanelButton extends Component {
  render() {
    const p = this.props;
    const className = `${CLASSES['point']} ${p.className || ''}`
    return (
      <div className={className}></div>
    );
  }
}

export default ToolsPanelButton;
