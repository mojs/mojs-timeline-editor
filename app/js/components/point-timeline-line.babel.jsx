import { h, Component } from 'preact';
import {bind} from 'decko';
import {classNames} from '../helpers/style-decorator';

const CLASSES =
  require('../../css/blocks/point-timeline-line.postcss.css.json');
require('../../css/blocks/point-timeline-line');

import SegmentTimeline from './segment-timeline';

@classNames(CLASSES)
class PointTimelineLine extends Component {
  render () {
    const {state} = this.props;

    return (
      <div className={this._getClassName(state)}
            data-component="point-timeline-line">

        <div className="point-timeline-line__inner">
          <div className="point-timeline-line__header" />
          <div className="point-timeline-line__body">
            <span>{ this._renderProperties(state) }</span>
            <div className="point-timeline-line__property" />
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
    const {state, entireState} = this.props;
    const results = [];

    let prevSpot = prop[0];
    for (let i = 0; i < prop.length; i++) {
      const spot = prop[i];
      const meta = { id: state.id, prop: key, spotIndex: i };
      results.push(
        <SegmentTimeline state={spot} meta={meta} entireState={entireState} />
      );
      prevSpot = spot;
    }

    return (
      <div className="point-timeline-line__property">
        {results}
      </div>
    );
  }

  _getClassName(state) {
    const selectClass = (state.isSelected) ? 'is-selected': '';
    const openClass = (state.isOpen) ? 'is-open': '';

    return `point-timeline-line ${selectClass} ${openClass}`;
  }

}

export default PointTimelineLine;
