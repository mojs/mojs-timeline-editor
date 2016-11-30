import { h, Component } from 'preact';
import {bind} from 'decko';

import MainPanel from './main-panel/main-panel';
import Icons from './icons';
import InsertPoint from './insert-point';
import C from '../constants';

const CLASSES = require('../../css/blocks/timeline-editor.postcss.css.json');
require('../../css/blocks/timeline-editor');

class TimelineEditor extends Component {
  render () {
    const {store} = this.context;
    const state   = store.getState();
    this._state   = state;

    return (
        <div>
          <InsertPoint state={state} />
          <div  className={CLASSES['timeline-editor']}
                onMouseMove={this._mouseMove}>
            <Icons />
            <MainPanel
              state={state.mainPanel}
              entireState={state}
              isPlayerPassed={true} />
          </div>
        </div>
    );
  }

  componentDidMount() {
    const {store} = this.context;
    store.subscribe(this.forceUpdate.bind(this));
    document.addEventListener('mousemove', this._docMouseMove);
  }

  @bind
  _mouseMove(e) {
    /* we cannot `stopPropagation` the event, because `hammerjs`
       will not be able to work properly on `resize-handle`, so we
       set the `isTimelinePanel` flag instead indicating that we are
       inside the `timeline-editor` panel
    */
    e.isTimelinePanel = true;
    const {store} = this.context;
    const {controls} = this._state;
    if (controls.isMouseInside) { return; }

    store.dispatch({ type: 'CONTROLS_SET_MOUSE_INSIDE', data: true });
  }

  @bind
  _docMouseMove(e) {
    if (e.isTimelinePanel) { return; }
    const {store} = this.context;
    const {controls} = this._state;
    console.log();

    if (controls.isMouseInside) {
      store.dispatch({ type: 'CONTROLS_SET_MOUSE_INSIDE', data: false });
    }
  }
}

export default TimelineEditor;
