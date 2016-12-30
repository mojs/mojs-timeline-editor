import { h, Component } from 'preact';
import {bind} from 'decko';

import Icon from '../icon';

const CLASSES = require('../../../css/blocks/property-line.postcss.css.json');
require('../../../css/blocks/property-line');
const isMatch = (spot, id, name) => {
  return spot.id === id && spot.prop === name;
};

class PropertyLine extends Component {
  render () {
    const p = this.props;

    return (
      <div className={CLASSES['property-line']}>
        <div className={CLASSES['label']} title={p.name}>{p.name}</div>
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
    const {state, name, entireState} = this.props;
    const {id} = state;
    const {selectedSpot} = entireState;

    // if selected spot doesnt match the property line -
    // update the current value
    if (!isMatch(selectedSpot, id, name)) { return this._onKeyDownCurrent(e); }

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

    const data = { ...selectedSpot, value: newValue };

    let step = (e.altKey) ? 10 : 1;
    if (e.shiftKey) { step *= 10; }

    switch (e.which) {
    case 38: {
      data.value[index] += step;
      return store.dispatch({ type: 'UPDATE_SELECTED_SPOT', data });
    }

    case 40: {
      data.value[index] -= step;
      return store.dispatch({ type: 'UPDATE_SELECTED_SPOT', data });
    }

    default: {
      store.dispatch({ type: 'UPDATE_SELECTED_SPOT', data });
    }
    }
  }

  _onKeyDownCurrent(e) {
    const {store} = this.context;
    const {state, name, entireState} = this.props;
    const {selectedSpot} = entireState;

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

    const data = { id: state.id, name, value: newValue };
    let step = (e.altKey) ? 10 : 1;
    if (e.shiftKey) { step *= 10; }

    switch (e.which) {
    case 38: {
      data.value[index] += step;
      return store.dispatch({ type: 'UPDATE_SELECTED_SPOT_CURRENT', data });
    }

    case 40: {
      data.value[index] -= step;
      return store.dispatch({ type: 'UPDATE_SELECTED_SPOT_CURRENT', data });
    }

    default: {
      return store.dispatch({ type: 'UPDATE_SELECTED_SPOT_CURRENT', data });
    }
    }
  }

  _getValue() {
    const {name, state, entireState} = this.props;
    const {selectedSpot} = entireState;
    const {currentProps, id} = state;

    // if selected spot matches the property line -
    // get the selected spot values
    if (isMatch(selectedSpot, id, name)) {
      const {id, prop, spotIndex, type} = selectedSpot;
      return entireState.points[id].props[prop][spotIndex][type].value;
    }

    return currentProps[name];
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
