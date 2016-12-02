import { h, Component } from 'preact';
import { bind } from 'decko';

import PointTimeline from './point-timeline';

const CLASSES = require('../../css/blocks/timelines-panel.postcss.css.json');
require('../../css/blocks/timelines-panel');

class TimelinePanel extends Component {
  render () {
    const {state} = this.props;
    return (
      <div className={CLASSES['timelines-panel']}>
        { this._renderTimelines(state) }
      </div>
    );
  }

  _renderTimelines(state) {
    const results = [];
    for (let i = 0; i < state.length; i++) {
      results.push(
        <PointTimeline state={state[i]} />
      );
    }

    return results;
  }
}

export default TimelinePanel;
