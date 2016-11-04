import { h, Component } from 'preact';
import { bind } from 'decko';

import HideButton from '../hide-button';
import ResizeHandle from '../resize-handle';

const CLASSES = require('../../../css/blocks/right-panel.postcss.css.json');
require('../../../css/blocks/right-panel');

class RightPanel extends Component {
  render() {
    const {state} = this.props;
    return (
      <div className={CLASSES['right-panel']}>
        <HideButton isHidden={state.isHidden} onTap={this._onHideButton} />
        <ResizeHandle {...this.props} />
      </div>
    );
  }

  @bind
  _onHideButton() {
    const {store} = this.context;

    store.dispatch({ type: 'MAIN_PANEL_HIDE_TOGGLE' });
  }
}

export default RightPanel;
