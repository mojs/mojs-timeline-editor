import { h, Component } from 'preact';
import {bind} from 'decko';
import Hammer from 'hammerjs';

const CLASSES =
      require('../../css/blocks/point-timeline.postcss.css.json');
require('../../css/blocks/point-timeline');

class PointTimeline extends Component {
  getInitialState() {
    return {
      // deltaX1: 0,
      deltaX2: 0
    };
  }
  render () {
    let {duration, meta, start, end} = this.props;

    // if (meta.prop === 'x') {
    //   console.log(`duration: ${duration}, end: ${end}`);
    // }

    duration /= 10;
    duration += this.state.deltaX2;

    const style = { width: `${duration}em` };

    const spotClass = CLASSES['point-timeline__spot'];
    return (
      <div style={style}
           className={this._getClassName(this.props)}
           data-component="point-timeline">
        <div className={CLASSES['point-timeline__bar']} />
        <div ref={(el)=> { this._leftSpot = el; }}
             className={this._getSpotClassName()} />
        <div ref={(el)=> { this._rightSpot = el; }}
             className={this._getSpotClassName(true)}
             style={{ zIndex: 50 - meta.spotIndex }}
             />
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

    // mcLeft.on('pan', (e) => { this._pan(e, 'left'); });
    mcRight.on('pan', (e) => { this._pan(e, 'right'); });
    mcRight.on('panend', (e) => { this._panEnd(e, 'right'); });
  }

  _pan(e, direction) {
    // if (direction === 'left') {
    //   this.setState({ deltaX1: e.deltaX });
    // }

    if (direction === 'right') {
      this.setState({ deltaX2: e.deltaX });
    }
  }

  _panEnd(e, direction) {
    const {meta}  = this.props;
    const {store} = this.context;

    if (direction === 'right') {
      store.dispatch({
        type: 'SHIFT_SPOT',
        data: {
          value: this.state.deltaX2*10,
          ...meta,
          spotIndex: meta.spotIndex
        }
      });

      this.setState({ deltaX2: 0 });
    }
  }

}

export default PointTimeline;
