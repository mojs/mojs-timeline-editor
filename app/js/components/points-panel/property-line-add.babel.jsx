import { h, Component } from 'preact';
import Hammer from 'hammerjs';
import {bind} from 'decko';
import clamp from '../../helpers/clamp';
import resetEvent from '../../helpers/global-reset-event';
import Icon from '../icon';

const CLS = require('../../../css/blocks/property-line-add.postcss.css.json');
require('../../../css/blocks/property-line-add');

const DEFAULT_STATE = {
  count:    1,
  name:     'property name',
  isAdd:    false,
  error:    null
};

const EXIST_MESSAGE = 'already exist';

class PropertyLineAdd extends Component {
  getInitialState() {
    const error = this._isExist() ? EXIST_MESSAGE: null;
    return {...DEFAULT_STATE, error};
  }

  render () {
    const {name, count, error} = this.state;
    return (
      <div className={this._getClassName()}
          onClick={ e => e.stopPropagation() }>
        <div className={CLS['label']} ref={ el => this._label = el }
              onClick={this._onLabelClick}>
          {'+ add'}
        </div>
        <div className={CLS['property-line-add__inputs']}>
          <div className={CLS['name-input-wrapper']}>
            <input className={`${CLS['input']} ${CLS['input--name']}`}
              ref={ el => this._name = el }
              onKeyUp={this._onNameKeyUp} value={name} title="property name" />
            <label className={CLS['error-label']}>
              {error}
            </label>
          </div>
          <input className={`${CLS['input']} ${CLS['input--count']}`}
            value={count} onKeyUp={this._onCountKeyUp}
            title="number of properties [1...4]" />
        </div>
        <div className={CLS['button']} onClick={this._onSubmit}>
          <div className={CLS['button__inner']}>
            <Icon shape="tick" />
          </div>
        </div>
      </div>
    );
  }

  shouldComponentUpdate(_, nextState) {
    this._isFocus = !this.state.isAdd && nextState.isAdd;
  }

  componentDidUpdate() {
    if (this._isFocus) {
      this._name.focus && this._name.focus();
      this._name.select && this._name.select();
    }
    this._isFocus = false;
  }

  @bind
  _onNameKeyUp(e) {
    if (e.which === 13) { return this._onSubmit(); }

    const name = e.target.value;
    const trimmedName = name.trim();
    const error = (trimmedName.length <= 0) ? 'none-empty'
      : this._isExist(name) ? EXIST_MESSAGE : null;

    this.setState({ name, error });
  }

  @bind
  _onCountKeyUp(e) {
    const code = e.which;
    if (code === 8) { return; } // backspace
    if (code === 13) { return this._onSubmit(); }

    const min = 1;
    const max = 4;

    if (code === 38 || code === 40) {
      const step = (e.which === 38) ? 1 : (e.which === 40) ? -1 : 0;
      const count = clamp(this.state.count + step, min, max);
      return this.setState({ count });
    }

    const value = parseInt(e.target.value, 10);
    const count = clamp(value || this.state.count, min, max);
    this.setState({ count });
  }

  _getClassName() {
    const isAdd = this.state.isAdd ? CLS['is-add'] : '';
    const valid = (this.state.error == null) ? CLS['is-valid'] : '';

    return `${CLS['property-line-add']} ${isAdd} ${valid}`;
  }

  @bind
  _onSubmit() {
    if (this.state.error != null) { return; }

    const {state} = this.props;
    const {store} = this.context;
    const data = {...state, property: { ...this.state }};

    const isExist   = this._isExist();
    const isDefault = this.state.name === DEFAULT_STATE.name;
    let error = (isDefault || isExist) ? EXIST_MESSAGE : null;
    this.setState({ ...DEFAULT_STATE, error });
    store.dispatch({ type: 'ADD_POINT_PROPERTY', data });
  }

  @bind
  _onLabelClick(e) { this.setState({ isAdd: true }); }

  _isExist(name=DEFAULT_STATE.name) {
    return this.props.state.props[name] != null;
  }

  componentDidMount() {
    resetEvent.add((e) => { this.setState({ isAdd: false }); });
  }
}

export default PropertyLineAdd;
