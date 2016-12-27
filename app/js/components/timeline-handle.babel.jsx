import { h, Component } from 'preact';
import Hammer from 'hammerjs';

import Icon from './icon';
import clamp from '../helpers/clamp';

const CLASSES = require('../../css/blocks/timeline-handle.postcss.css.json');
require('../../css/blocks/timeline-handle');

class TimelineHandle extends Component {
  getInitialState() { return { deltaX: 0 }; }
  render() {
    const {state} = this.props;
    const shift = (state.progress + this.state.deltaX)/10;
    const style = { transform: `translateX(${shift}em)` };

    return (
      <div className={CLASSES['timeline-handle']} style={style}
           data-component="timeline-handle">
        <div className={CLASSES['timeline-handle__head']}
              ref={ (el) => { this._head = el; } }>
          <Icon shape="handle" />
        </div>
      </div>
    );
  }


  componentDidMount() {
    const mc = new Hammer.Manager(this._head);
    mc.add(new Hammer.Pan);

    const {store} = this.context;
    mc.on('pan', (e) => {
      this.setState({ deltaX: this._clampDeltaX(10*e.deltaX, 7000) });
    });

    mc.on('panstart', (e) => {
      store.dispatch({ type: 'RESET_SELECTED_SPOT' });
    });

    mc.on('panend', (e) => {
      const {state} = this.props;
      const data = state.progress + this.state.deltaX;
      store.dispatch({ type: 'SET_PROGRESS', data });
      this.setState({ deltaX: 0 });
    });
  }

  _clampDeltaX(deltaX, max) {
    const {state} = this.props;
    deltaX = (state.progress + deltaX < 0) ? -state.progress : deltaX;
    deltaX = (state.progress + deltaX > max)
      ? max-state.progress : deltaX;
    return deltaX;
  }

}

export default TimelineHandle;
