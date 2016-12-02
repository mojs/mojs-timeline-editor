import { h, Component } from 'preact';
import { bind } from 'decko';

import PointsPanel from '../points-panel/points-panel';
import TimelinesPanel from '../timelines-panel';

const CLASSES = require('../../../css/blocks/body-panel.postcss.css.json');
require('../../../css/blocks/body-panel');

class BodyPanel extends Component {
  render() {
    const {state} = this.props;

    return (
      <div className={CLASSES['body-panel']}>
        <div className={CLASSES['body-panel__left']}>
          <PointsPanel state={state.points}/>
        </div>
        <div className={CLASSES['body-panel__right']}>
          <TimelinesPanel state={state.points} />
        </div>
      </div>
    );
  }

}

export default BodyPanel;
