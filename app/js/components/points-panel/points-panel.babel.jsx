import { h, Component } from 'preact';

const CLASSES = require('../../../css/blocks/points-panel.postcss.css.json');
require('../../../css/blocks/points-panel');

import PointLine from './point-line';

class PointsPanel extends Component {
  render () {
    const {state} = this.props;

    return (
      <div className={CLASSES['points-panel']}>
        <PointLine state={state} />
      </div>
    );
  }

}

export default PointsPanel;
