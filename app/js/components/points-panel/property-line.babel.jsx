import { h, Component } from 'preact';
import {bind} from 'decko';

import Icon from '../icon';

const CLASSES = require('../../../css/blocks/property-line.postcss.css.json');
require('../../../css/blocks/property-line');

class PropertyLine extends Component {
  render () {
    const p = this.props;

    return (
      <div className={CLASSES['property-line']}>
        <div className={CLASSES['label']}>{p.name}</div>
        <div className={CLASSES['property-line__inputs']}>
          {this._renderInputs()}
        </div>
        <div className={CLASSES['button']} onClick={this._onAddSpot}>
          <div className={CLASSES['button__inner']}>
            <Icon shape="spot" />
          </div>
        </div>
      </div>
    );
  }

  _renderInputs() {
    let value = this._getValue();
    value = (value instanceof Array) ? value : [value];

    const result = [];
    for (let i = 0; i < value.length; i++) {
      result.push(
        <input  className={CLASSES['input']}
                value={value[i]}
                data-width={`1/${value.length}`}
                data-index={i}
                onKeyDown={this._onKeyDown} />
      );
    }
    return result;
  }

  @bind
  _onKeyDown(e) {
    const {store} = this.context;
    const {state, entireState} = this.props;
    const {selectedSpot} = entireState;
    if (selectedSpot.id == null) { return; }

    const target = e.target;
    const index = parseInt(target.getAttribute('data-index'), 10);
    const current = this._getValue();

    // try to parse the input
    const parsed = parseInt(target.value, 10);
    // if fail to parse - set it to the current valid value
    const value = (parsed != null && !isNaN(parsed)) ? parsed : current[index];

    // if property holds an array clone it
    const newValue = (current instanceof Array) ? [...current] : value;
    // and update the item by index
    if (newValue instanceof Array) { newValue[index] = value; }

    const data = { ...selectedSpot, input: { index, value: newValue } };

    let step = (e.altKey) ? 10 : 1;
    if (e.shiftKey) { step *= 10; }

    switch (e.which) {
    case 38: {
      data.input.value[index] += step;
      return store.dispatch({ type: 'UPDATE_SELECTED_SPOT', data });
    }

    case 40: {
      data.input.value[index] -= step;
      return store.dispatch({ type: 'UPDATE_SELECTED_SPOT', data });
    }

    default: {
      store.dispatch({ type: 'UPDATE_SELECTED_SPOT', data });
    }
    }


  }

  _getValue() {
    const {name, state, entireState} = this.props;
    const {selectedSpot} = entireState;
    const {currentProps} = state;

    if (selectedSpot.id == null) { return currentProps[name]; }

    const {id, prop, spotIndex, type} = selectedSpot;
    return entireState.points[id].props[prop][spotIndex][type].value;
  }

  @bind
  _onAddSpot(e) {
    const {store} = this.context;
    const p = this.props;
    const {state, entireState} = p;

    store.dispatch({
      type: 'ADD_PROPERTY_SEGMENT',
      data: { id: p.id, name: p.name, time: entireState.progress }
    });
  }
}

export default PropertyLine;
