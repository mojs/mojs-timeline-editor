import { h, Component } from 'preact';
import {bind} from 'decko';
import Hammer from 'hammerjs';

const CLASSES =
      require('../../css/blocks/point-timeline.postcss.css.json');
require('../../css/blocks/point-timeline');

class PointTimeline extends Component {
  getInitialState() {
    return {
      dDuration: 0,
      dDelay: 0
    };
  }
  render () {
    let {duration, meta, delay} = this.props;

    delay /= 10;
    delay += this.state.dDelay;
    delay = Math.max(delay, 0);

    duration /= 10;
    duration += this.state.dDuration;
    // duration = Math.max(duration, 40/10);

    const style      = { width: `${duration + delay}em` };
    const delayStyle = { width: `${delay}em` };
    const spotStyle  = { transform: `translate(${delay}em, 0) rotate(45deg)` };
    const spotClass  = CLASSES['point-timeline__spot'];

    return (
      <div style={style}
           className={this._getClassName(this.props)}
           data-component="point-timeline">
        <div className={CLASSES['point-timeline__bar']}>
          <div style={delayStyle}
               className={CLASSES['point-timeline__delay']} />
          <div ref={(el)=> { this._leftSpot = el; }}
                style={spotStyle}
                className={this._getSpotClassName()} />
          <div ref={(el)=> { this._rightSpot = el; }}
                className={this._getSpotClassName(true)}
                style={{ zIndex: 50 - meta.spotIndex }}
                />
        </div>
      </div>
    );
  }

  _getSpotClassName(isRight) {
    const spotClass  = CLASSES['point-timeline__spot'];
    const rightClass = (isRight) ? CLASSES['point-timeline__spot--right'] : '';
    return `${spotClass} ${rightClass}`;
  }

  _getClassName(props) { return `${CLASSES['point-timeline']}`; }

  componentDidMount() {
    const mcLeft  = new Hammer.Manager(this._leftSpot);
    const mcRight = new Hammer.Manager(this._rightSpot);
    mcLeft.add(new Hammer.Pan);
    mcRight.add(new Hammer.Pan);
    mcLeft.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
    mcRight.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    mcRight.on('pan', (e) => { this._pan(e, 'right'); });
    mcRight.on('panend', (e) => { this._panEnd(e, 'right'); });

    mcLeft.on('pan', (e) => { this._pan(e, 'left'); });
    mcLeft.on('panend', (e) => { this._panEnd(e, 'left'); });
  }

  _pan(e, direction) {
    if (direction === 'right') { this.setState({ dDuration: e.deltaX }); }
    if (direction === 'left') { this.setState({ dDelay: e.deltaX }); }
  }

  _panEnd(e, direction) {
    const {meta}  = this.props;
    const {store} = this.context;

    if (direction === 'right') {
      store.dispatch({
        type: 'SHIFT_SPOT',
        data: {
          duration: this.state.dDuration*10,
          ...meta,
          spotIndex: meta.spotIndex
        }
      });
    }

    if (direction === 'left') {
      store.dispatch({
        type: 'SHIFT_SPOT',
        data: {
          delay: this.state.dDelay*10,
          ...meta,
          spotIndex: meta.spotIndex
        }
      });
    }

    this.setState({ dDuration: 0, dDelay: 0 });
  }

}

export default PointTimeline;
