import { h, Component } from 'preact';

const CLASSES = require('../../../css/blocks/tools-panel.postcss.css.json');
require('../../../css/blocks/tools-panel');

class ToolsPanelButton extends Component {
  render() {
    const p = this.props;
    const className = `${CLASSES['button']} ${p.className || ''}`;
    return (
      <div className={className} onClick={p.onClick}>
        {p.children}
      </div>
    );
  }
}

export default ToolsPanelButton;
