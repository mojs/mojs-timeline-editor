import { h, Component } from 'preact';
import {bind} from 'decko';
import Hammer from 'hammerjs';
import C from '../constants';
import {classNames} from '../helpers/style-decorator';

const CLASSES = require('../../css/blocks/segment-timeline.postcss.css.json');
require('../../css/blocks/segment-timeline');

import Spot from './spot';
import Easing from './easing';

@classNames(CLASSES)
class SegmentTimeline extends Component {
  render () {
    const {state, meta, entireState} = this.props;

    return (
      <div className="segment-timeline" data-component="segment-timeline">
        <div className="segment-timeline__bar">
          <div className="segment-timeline__delay" />
          <Spot type="start" {...this.props} />
          <Spot type="end" {...this.props}>
            <Easing {...this.props} />
          </Spot>
        </div>
      </div>
    );
  }
}

export default SegmentTimeline;
