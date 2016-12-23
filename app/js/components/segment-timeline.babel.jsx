import { h, Component } from 'preact';
import {bind} from 'decko';
import Hammer from 'hammerjs';
import C from '../constants';

const CLASSES = require('../../css/blocks/segment-timeline.postcss.css.json');
require('../../css/blocks/segment-timeline');

import Spot from './spot';

class SegmentTimeline extends Component {
  render () {
    const {state, meta, entireState} = this.props;

    return (
      <div className={this._getClassName(this.props)}
           data-component="segment-timeline">
        <div className={CLASSES['segment-timeline__bar']}>
          <div className={CLASSES['segment-timeline__delay']} />
          <Spot type="start" {...this.props} />
          <Spot type="end" {...this.props} />
        </div>
      </div>
    );
  }

  _getClassName(props) { return `${CLASSES['segment-timeline']}`; }

}

export default SegmentTimeline;
