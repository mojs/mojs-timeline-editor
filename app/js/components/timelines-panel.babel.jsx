import { h, Component } from 'preact';
import { bind } from 'decko';

import PointTimelineLine from './point-timeline-line';

const CLASSES = require('../../css/blocks/timelines-panel.postcss.css.json');
require('../../css/blocks/timelines-panel');

class TimelinePanel extends Component {
  render () {

    return (
      <div className={CLASSES['timelines-panel']}>
        { this._renderTimelines() }
      </div>
    );
  }

  _renderTimelines() {
    const {state} = this.props;
    const {points} = state;
    const keys = Object.keys(points);

    const results = [];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      results.push(
        <PointTimelineLine state={points[key]} entireState={state} />
      );
    }

    return results;
  }
}

export default TimelinePanel;
