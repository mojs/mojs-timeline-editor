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
        {this._renderProperties(state)}
        <div className={CLASSES['point-timeline-line__inner']}>
          <div className={CLASSES['point-timeline-line__header']}></div>
          <div className={CLASSES['point-timeline-line__body']}>

            <div className={CLASSES['point-timeline-line__property']}>
              <PointTimeline state={state} />
              <PointTimeline state={state} />
              <PointTimeline state={state} />
              <PointTimeline state={state} />
            </div>

            <div className={CLASSES['point-timeline-line__property']}>
              <PointTimeline state={state} />
            </div>

          </div>
        </div>
      </div>
    );
  }

  _renderProperties(state) {
    return null;
    // const results = [];
    // console.log(state);
    // return results;
  }

  _getClassName(state) {
    const selectClass = (state.isSelected) ? CLASSES['is-selected']: '';
    const openClass = (state.isOpen) ? CLASSES['is-open']: '';

    return `${CLASSES['point-timeline-line']} ${selectClass} ${openClass}`;
  }

}

export default PointTimelineLine;
