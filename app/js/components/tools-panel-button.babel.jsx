import {h, Component} from 'preact';
import Icon from './icon';

const C = require('../../css/blocks/tools-panel-button.postcss.css.json');
require('../../css/blocks/tools-panel-button');

class ToolsPanelButton extends Component {
  render() {
    return (
      <div className={C['tools-panel-button']} onClick={this._onSubmit}
            data-component="tools-panel-button">
        <div className={C['tools-panel-button__inner']}>
          <Icon shape={this.props.icon} />
        </div>
      </div>
    );
  }

  _onSubmit(e) {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e);
    }
  }
}

export default ToolsPanelButton;
