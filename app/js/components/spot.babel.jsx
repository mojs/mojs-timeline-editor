import { h, Component } from 'preact';
import {bind} from 'decko';
import Hammer from 'hammerjs';
import C from '../constants';

const CLASSES = require('../../css/blocks/spot.postcss.css.json');
require('../../css/blocks/spot');

class Spot extends Component {
  getInitialState() { return { dDelay: 0, dDuration: 0 }; }

  render () {
    const {meta, type, state} = this.props;
    const {delay, duration} = state;
    const {dDelay, dDuration} = this.state;

    const delayWidth = delay/10 + dDelay;
    const durationWidth = duration/10 + dDuration;

    const style = {
      width: `${(type === 'start') ? delayWidth : durationWidth}em`
      // zIndex:    50 - meta.spotIndex,
    };

    return (<div className={this._getClassName()}
                style={style}
                data-component="spot">
              <div  className={CLASSES['spot__dot']}
                    ref={(el) => { this._dot = el; }} />
            </div>);
  }

  _checkSelected() {
    // return;
    // const {state, entireState, meta, type} = this.props;
    // const {start, end, delay} = state;
    // const {progress} = entireState;
    // const {store} = this.context;
    //
    // const dot = state[type];
    //
    // const delta = Math.abs(progress - dot.time);
    // const isSelected = (delta < C.SPOT_SELECTION_GAP);
    //
    // if (dot.isSelected !== isSelected) {
    //   store.dispatch({
    //     type: 'SET_SPOT_SELECTION',
    //     data: { ...meta, type, state: isSelected }
    //   });
    // } else {
    //   console.log('ok');
    // }
  }

  _getClassName() {
    const {type, state} = this.props;
    const endClass = (type === 'end') ? CLASSES['spot--end'] : '';
    const selectClass = state[type].isSelected ? CLASSES['is-selected'] : '';

    return `${CLASSES['spot']} ${endClass} ${selectClass}`;
  }

  // _isSelected() {
  //   const {type, state, entireState, meta} = this.props;
  //   const {store} = this.context;
  //   const dot = state[type];
  //   const delta1 = Math.abs(entireState.progress - dot.time);
  //   const delta2 = Math.abs(entireState.progress - (dot.time + state.delay));
  //   const isSelect1 = delta1 <= C.SPOT_SELECTION_GAP && !state.delay;
  //   const isSelect2 = delta2 <= C.SPOT_SELECTION_GAP;
  //
  //   return isSelect1 || isSelect2;
  // }

  _isCounterpartSelected() {
    const {type, state, entireState, meta} = this.props;
  }

  componentDidMount() {
    const mc  = new Hammer.Manager(this._dot);
    mc.add(new Hammer.Pan);
    mc.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    mc.on('pan', this._pan);
    mc.on('panend', this._panEnd);
  }

  @bind
  _pan(e) {
    const direction = this.props.type;
    if (direction === 'end') {
      const threshold = C.MIN_DURATION;
      const min = - this.props.duration + threshold;
      const dDuration = (e.deltaX*10 < min) ? min/10 : e.deltaX;
      this.setState({ dDuration });
    }
    if (direction === 'start') { this.setState({ dDelay: e.deltaX }); }
  }

  @bind
  _panEnd(e) {
    const {meta}  = this.props;
    const {store} = this.context;

    store.dispatch({
      type: 'SHIFT_SEGMENT',
      data: {
        delay:    this.state.dDelay*10,
        duration: this.state.dDuration*10,
        ...meta
      }
    });

    this.setState({ dDelay: 0, dDuration: 0 });
  }
}

export default Spot;
