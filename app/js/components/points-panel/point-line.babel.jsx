import { h, Component } from 'preact';
import {bind} from 'decko';

const CLS = require('../../../css/blocks/point-line.postcss.css.json');
require('../../../css/blocks/point-line');

import PropertyLine from './property-line';
import Icon from '../icon';

class PointLine extends Component {
  render () {
    const {state} = this.props;

    return (
      <div className={this._getClassName(state)}>
        <div className={CLS['label']} onClick={this._onCheck}>
          {state.name}
        </div>

        <div className={`${CLS['button']} ${CLS['is-spot']}`}
              onClick={this._onAddSpot}>
          <div className={CLS['button__inner']}>
            <Icon shape="spot" />
          </div>
        </div>

        <div  className={`${CLS['button']} ${CLS['is-arrow']}`}
              onClick={this._onOpen}>
          <div className={CLS['button__inner']}>
            <Icon shape="dropdown" />
          </div>
        </div>
        <div className={CLS['body']}>
          {this._renderProperties(state)}
        </div>
      </div>
    );
  }

  _getClassName(state) {
    const openClass  = (state.isOpen) ? CLS['is-open']: '';
    const checkClass = (state.isSelected) ? CLS['is-check']: '';
    return `${CLS['point-line']} ${openClass} ${checkClass}`;
  }

  _renderProperties(state) {
    const {props} = state;
    const names = Object.keys(props);
    const results = [];

    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      results.push(
        <PropertyLine id={state.id} name={name} state={state} />
      );
    }

    return results;
  }

  @bind
  _onCheck() {
    const {state} = this.props;
    const {store} = this.context;

    // store.dispatch({ type: 'SELECT_POINT', data: state.id });
  }

  @bind
  _onAddSpot() {
    const {state, entireState} = this.props;
    const {store} = this.context;

    const data = { id: state.id, time: entireState.progress };
    store.dispatch({ type: 'ADD_SPOT', data });
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
