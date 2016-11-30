import { h, Component } from 'preact';
import { bind } from 'decko';

import Point from './point';
import Button from './button';
import Icon from '../icon';

// import setSelected from '../../actions/set-selected';
// import ResizeHandle from '../resize-handle';
// import TimelinePanel from '../timeline-panel';

const CLASSES = require('../../../css/blocks/tools-panel.postcss.css.json');
require('../../../css/blocks/tools-panel');

/* TODO:
    [x] refactor to emit `action creators` in event handlers;
*/
class ToolsPanel extends Component {
  render() {
    return (
      <div className={CLASSES['tools-panel']}>
        <Point />
        <Button className={this._getClassFor('plus')} onClick={this._setPlus}>
          <Icon shape="plus" />
        </Button>
        <Button className={this._getClassFor('html')} onClick={this._setHtml}>
          {'HTML'}
        </Button>
        <a className={`${CLASSES['button']} ${CLASSES['is-logo']}`}
           href='https://github.com/legomushroom/mojs-timeline-editor/'
           target="_blank">
          <Icon shape="mojs-logo" />
        </a>
      </div>
    );
  }

  _getClassFor(type) {
    const {state} = this.props;
    const {selected} = state;

    return (selected === type) ? CLASSES['is-active'] : '';
  }

  @bind
  _setPlus(e) {
    const {store} = this.context;
    store.dispatch({ type: 'TOOLS_SET_SELECTED', data: 'plus' });
    // store.dispatch(setSelected('OBJECT'));
  }

  @bind
  _setHtml(e) {
    const {store} = this.context;
    store.dispatch({ type: 'TOOLS_SET_SELECTED', data: 'html' });
    // store.dispatch(setSelected('HTML'));
  }
}

export default ToolsPanel;
