import { h, Component } from 'preact';
import {bind} from 'decko';

const CLASSES = require('../../css/blocks/point-timeline.postcss.css.json');
require('../../css/blocks/point-timeline');

class PointTimeline extends Component {
  render () {
    const {state} = this.props;
    // const {props} = state;

    return (
      <div  className={this._getClassName(state)}
            data-component="point-timeline">
      </div>
    );
  }

  _getClassName(state) {
    const selectClass = (state.isSelected) ? CLASSES['is-selected']: '';
    return `${CLASSES['point-timeline']} ${selectClass}`;
  }

}

export default PointTimeline;
