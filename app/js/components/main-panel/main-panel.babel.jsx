import { h, Component } from 'preact';
import { bind } from 'decko';

import LeftPanel from './left-panel';
import RightPanel from './right-panel';
import C from '../../constants';

const CLASSES = require('../../../css/blocks/main-panel.postcss.css.json');
require('../../../css/blocks/main-panel');

class MainPanel extends Component {
  
  getInitialState() { return { deltaY: 0 }; }

  render () {
    const props    = this.props;
    const {state}  = props;

    let height = this._clampHeight(state.ySize - this.state.deltaY);
    // check state of `hide button` regarding current height
    this._checkHideButton(height);

    return (
      <section style={{height}}
               className={this._getClassNames()}
               data-component="main-panel">

        <LeftPanel />
        <RightPanel state={state}
                    onResize={this._resizeHeight}
                    onResizeEnd={this._resizeHeightEnd} />
      </section>
    );
  }

  @bind
  _resizeHeight(deltaY) {
    const {state} = this.props;
    const {store} = this.context;

    // reset `isTransition` state that is responsible
    // for `--is-transition` className
    if (state.isTransition) {
      store.dispatch({ type: 'MAIN_PANEL_RESET_TRANSITION' });
    }
    // set inner state `deltaY`
    this.setState({ deltaY });
  }

  @bind
  _resizeHeightEnd() {
    const {store} = this.context;

    store.dispatch({ type: 'MAIN_PANEL_SET_YSIZE', data: this.state.deltaY });
    this.setState({ deltaY: 0 });
  }


  // HELPERS

  _getClassNames() {
    const {store} = this.context;
    const {state} = this.props;

    const className = CLASSES['main-panel'];
    const transitionClass = state.isTransition
                              ? CLASSES['main-panel--transition'] : '';
    
    return `${className} ${transitionClass}`;
  }

  _clampHeight(height) {
    return Math.max(this._getMinHeight(), height);
  }

  _checkHideButton(height) {
    const {state} = this.props;
    const {store} = this.context;

    // if we drag the panel and it is in `isHidden` state, reset that state
    if (height > this._getMinHeight() && state.isHidden) {
      store.dispatch({ type: 'MAIN_PANEL_SET_HIDDEN', data: false });
    }
    // if we drag the panel and it is not in `isHidden` state, set that state
    // and reset prevHeight to add user the ability to expand the panel,
    // otherwise it will stick at the bottom
    if (height === this._getMinHeight() && !state.isHidden) {
      store.dispatch({ type: 'MAIN_PANEL_RESET_YPREV' });
    }
  }

  _getMinHeight() {
    return (this.props.isPlayerPassed) ? C.PLAYER_HEIGHT : 0;
  }
}

export default MainPanel;
