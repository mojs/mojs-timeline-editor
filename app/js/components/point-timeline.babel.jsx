import { h, Component } from 'preact';
import {bind} from 'decko';

const CLASSES =
      require('../../css/blocks/point-timeline.postcss.css.json');
require('../../css/blocks/point-timeline');

class PointTimeline extends Component {
  render () {
    const {state} = this.props;

    const spotClass = CLASSES['point-timeline__spot'];
    return (
      <div className={this._getClassName(this.props)}
           data-component="point-timeline">
        <div className={CLASSES['point-timeline__bar']}></div>
        <div className={this._getSpotClassName()}></div>
        <div className={this._getSpotClassName(true)}></div>
      </div>
    );
  }

  _getSpotClassName(isRight) {
    const spotClass = CLASSES['point-timeline__spot'];
    const rightClass = (isRight) ? CLASSES['point-timeline__spot--right'] : '';
    return `${spotClass} ${rightClass}`;
  }

  _getClassName(props) {
    return `${CLASSES['point-timeline']}`;
  }

}

export default PointTimeline;
