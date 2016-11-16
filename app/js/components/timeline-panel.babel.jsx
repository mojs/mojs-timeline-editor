import { h, Component } from 'preact';
import { bind } from 'decko';
import C from '../constants';

const CLASSES = require('../../css/blocks/timeline-panel.postcss.css.json');
require('../../css/blocks/timeline-panel');

const DASH_STEP = 5;
class TimelinePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: props.scale || 1,
      dashesPerSec:         20
    }

    // let {scale} = this.state;
    this._dashesAmount = props.time * this.state.dashesPerSec;
  }

  render () {
    return (
      <div className={CLASSES['timeline-panel']}>
        { this._timeline }
      </div>
    );
  }

  componentWillMount() {
    this._timeline = this._createTimeline();
  }

  @bind
  _createTimeline() {
    const dashes = this._compileDashes();
    const pointerValues = this._compileLabels();
    const {scale} = this.state;

    let timeline = (
      <svg width="100%" height={C.TIMELINE_HEIGHT}>
        <g style={{'font-size': `${scale}px`}}>
          {dashes}
          {pointerValues}
        </g>
      </svg>
    );
    return timeline;
  }

  @bind
  _createDash(dashNumber) {
    const {dashesPerSec, scale} = this.state;
    const dashType = (!(dashNumber % (dashesPerSec / 2)) || dashNumber === 0) ? 'large' :
                     !(dashNumber % (dashesPerSec / 4)) ? 'middle' : 'small';

    const color = dashType === 'large' ? '#fff' : '#ae9bae';
    const height = dashType === 'large' ? 7 : (dashType === 'middle') ? 6 : 4;
    const xPos = DASH_STEP * dashNumber;
    const yPos = C.TIMELINE_HEIGHT - height;

    return (
      <rect width="1" height={height} x={`${xPos}em`} y={yPos} fill={color}/>
    );
  }

  _compileDashes() {
    let dashes = [];
    for (let j = 0; j <= this._dashesAmount; j++) {
      dashes.push(this._createDash(j));
    }

    return dashes;
  };

  _compileLabels() {
    let labels = [];
    const {dashesPerSec, scale} = this.state;

    for (let j = 0, value = 0; j <= this._dashesAmount; j += dashesPerSec/2, value += 500) {
      const textAnchor = j === 0 ? 'start' : 'middle';
      const xPos = DASH_STEP * j;
      const yPos = C.TIMELINE_HEIGHT / 2;
      const className = CLASSES['label'];

      labels.push(
        <text x={`${xPos}em`} y={yPos} text-anchor={textAnchor} className={className}
              style={{'font-size': 'inherit'}}>
          <tspan style={{'font-size': `${7}px`}}> {value} </tspan>
        </text>
      );
    }

    return labels;
  }
}

export default TimelinePanel;
