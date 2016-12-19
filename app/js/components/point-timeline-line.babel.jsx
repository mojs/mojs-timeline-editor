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
      results.push( this._renderProperty(key, props[key]) );
    }
    return results;
  }

  _renderProperty(key, prop) {
    const {state} = this.props;
    const {spots} = prop;
    const results = [];

    let prevSpot = spots[0];
    for (let i = 0; i < spots.length; i++) {
      const spot = spots[i];
      const meta = { id: state.id, prop: key, spotIndex: i };
      results.push(
        <PointTimeline duration={spot.duration} delay={spot.delay} meta={meta} />
      );
      prevSpot = spot;
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
