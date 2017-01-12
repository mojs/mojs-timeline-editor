import { h, Component } from 'preact';
import {bind} from 'decko';

import MainPanel from './main-panel/main-panel';
import Icons from './icons';
import InsertPoint from './insert-point';
import Point from './point';
import C from '../constants';
import {classNames} from '../helpers/style-decorator';

const CLASSES = require('../../css/blocks/timeline-editor.postcss.css.json');
require('../../css/blocks/timeline-editor');

@classNames(CLASSES)
class TimelineEditor extends Component {
  render () {
    const {store} = this.context;
    const state   = store.getState();
    this._state   = state;

    return (
      <div>
        <InsertPoint state={state} />
        {this._renderPoints()}
        <div className="timeline-editor" onMouseMove={this._mouseMove}>
          <Icons />
          <MainPanel state={state.mainPanel} entireState={state}
                    isPlayerPassed={true} />
        </div>
      </div>
    );
  }

  _renderPoints() {
    const results = [];
    const {points} = this._state;
    const props = Object.keys(points);

    for (let i = 0; i < props.length; i++) {
      const key = props[i];
      results.push(
        <Point state={points[key]} entireState={this._state} />
      );
    }

    return results;
  }

  componentDidMount() {
    const {store} = this.context;
    store.subscribe(this.forceUpdate.bind(this));
    document.addEventListener('mousemove', this._docMouseMove);

    // let isInside = true;
    // setInterval(() => {
    //   console.time('1');
    //   store.dispatch({ type: 'CONTROLS_SET_MOUSE_INSIDE', data: isInside });
    //   console.timeEnd('1');
    // }, 2000);
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

    if (controls.isMouseInside) {
      store.dispatch({ type: 'CONTROLS_SET_MOUSE_INSIDE', data: false });
    }
  }
}

export default TimelineEditor;
