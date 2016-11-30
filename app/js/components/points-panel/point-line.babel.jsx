import { h, Component } from 'preact';
import {bind} from 'decko';

const CLASSES = require('../../../css/blocks/point-line.postcss.css.json');
require('../../../css/blocks/point-line');

import PropertyLine from './property-line';
import Icon from '../icon';

class PointLine extends Component {
  render () {
    const {state} = this.props;

    return (
      <div className={this._getClassName(state)}>
        <div className={CLASSES['label']} onClick={this._onCheck}>
          {state.name}
        </div>
        <div className={CLASSES['open-toggle']} onClick={this._onOpen}>
          <div className={CLASSES['open-toggle__inner']}>
            <Icon shape="dropdown" />
          </div>
        </div>
        <div className={CLASSES['body']}>
          <PropertyLine state={state} />
          <PropertyLine state={state} />
        </div>
      </div>
    );
  }

  _getClassName(state) {
    const openClass = (state.isOpen) ? CLASSES['is-open']: '';
    const checkClass = (state.isSelected) ? CLASSES['is-check']: '';
    return `${CLASSES['point-line']} ${openClass} ${checkClass}`;
  }

  @bind
  _onCheck() {
    this.base.classList.toggle( CLASSES['is-check'] );
  }

  @bind
  _onOpen(e) {
    e.stopPropagation();
    this.base.classList.toggle( CLASSES['is-open'] );
  }
}

export default PointLine;
