import { h, Component } from 'preact';
import {bind} from 'decko';

const CLASSES =
      require('../../css/blocks/point-timeline-line.postcss.css.json');
require('../../css/blocks/point-timeline-line');

import PointTimeline from './point-timeline';

class PointTimelineLine extends Component {
  render () {
    const {state} = this.props;

    return (
      <div  className={this._getClassName(state)}
            data-component="point-timeline-line">

        <div className={CLASSES['point-timeline-line__inner']}>
          <div className={CLASSES['point-timeline-line__header']}></div>
          <div className={CLASSES['point-timeline-line__body']}>

            { this._renderProperties(state) }

          </div>
        </div>
      </div>
    );
  }

  _renderProperties(state) {
    const {props} = state;
    const results = [];

    const keys = Object.keys(props);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      results.push( this._renderProperty(props[key]) );
    }

    // <div className={CLASSES['point-timeline-line__property']}>
    //   <PointTimeline state={state} />
    //   <PointTimeline state={state} />
    //   <PointTimeline state={state} />
    //   <PointTimeline state={state} />
    // </div>
    //
    // <div className={CLASSES['point-timeline-line__property']}>
    //   <PointTimeline state={state} />
    // </div>

    return results;
  }

  _renderProperty(prop) {
    const {spots} = prop;
    const results = [];

    for (let i = 0; i < spots.length-1; i++) {
      const prevSpot = spots[i-1];
      const spot = spots[i];
      const nextSpot = spots[i+1];

      const start = (i === 0) ? spot.time : prevSpot.time;
      const end = (i === 0) ? nextSpot.time : spot.time;

      results.push( <PointTimeline duration={end-start} /> );
    }

    return (
      <div className={CLASSES['point-timeline-line__property']}>
        {results}
      </div>
    );
  }

  _getClassName(state) {
    const selectClass = (state.isSelected) ? CLASSES['is-selected']: '';
    const openClass = (state.isOpen) ? CLASSES['is-open']: '';

    return `${CLASSES['point-timeline-line']} ${selectClass} ${openClass}`;
  }

}

export default PointTimelineLine;
