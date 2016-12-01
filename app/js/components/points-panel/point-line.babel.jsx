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
          {this._renderProperties(state)}
        </div>
      </div>
    );
  }

  _getClassName(state) {
    const openClass  = (state.isOpen) ? CLASSES['is-open']: '';
    const checkClass = (state.isSelected) ? CLASSES['is-check']: '';
    return `${CLASSES['point-line']} ${openClass} ${checkClass}`;
  }

  _renderProperties(state) {
    const {props} = state;
    const names = Object.keys(props);
    const results = [];

    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      results.push(
        <PropertyLine id={state.id} name={name} value={props[name]} />
      );
    }

    return results;
  }

  @bind
  _onCheck() {
    const {state} = this.props;
    const {store} = this.context;

    store.dispatch({ type: 'SELECT_POINT', data: state.id });
  }

  @bind
  _onOpen(e) {
    e.stopPropagation();
    const {state} = this.props;
    const {store} = this.context;
    store.dispatch({ type: 'TOGGLE_OPEN_POINT', data: state.id });
  }
}

export default PointLine;
