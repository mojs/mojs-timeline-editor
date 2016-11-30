import { h, Component } from 'preact';
import {bind} from 'decko';

const CLASSES = require('../../../css/blocks/point-line.postcss.css.json');
require('../../../css/blocks/point-line');

import PropertyLine from './property-line';

class PointLine extends Component {
  render () {
    const {state} = this.props;

    return (
      <div className={CLASSES['point-line']} onClick={this._onClick}>
        <div className={CLASSES['label']}>point1</div>
        <div className={CLASSES['body']}>
          <PropertyLine state={state} />
          <PropertyLine state={state} />
        </div>
      </div>
    );
  }

  @bind
  _onClick() {
    this.base.classList.toggle( CLASSES['is-check'] );
  }
}

export default PointLine;
