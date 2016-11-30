import { h, Component } from 'preact';

const CLASSES = require('../../../css/blocks/points-panel.postcss.css.json');
require('../../../css/blocks/points-panel');

import PointLine from './point-line';

class PointsPanel extends Component {
  render () {
    const {state} = this.props;

    return (
      <div className={CLASSES['points-panel']}>
        {this._renderPoints(state)}
      </div>
    );
  }

  _renderPoints(state) {
    const points = [];
    for (let i=0; i< state.length; i++) {
      points.push( <PointLine state={state[i]} /> );
    }
    return points;
  }

}

export default PointsPanel;
