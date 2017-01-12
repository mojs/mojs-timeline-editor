import {h, Component} from 'preact';
import {bind} from 'decko';
import clamp from '../../helpers/clamp';
import resetEvent from '../../helpers/global-reset-event';
import ToolsPanelButton from '../tools-panel-button';
import {classNames, refs, compose} from '../../helpers/style-decorator';

const CLS = require('../../../css/blocks/property-line-add.postcss.css.json');
require('../../../css/blocks/property-line-add');

const EXIST_MESSAGE = 'already exist';
const DEFAULT_STATE = {
  count:    1,
  name:     'property name',
  isAdd:    false,
  error:    null
};

@compose(classNames(CLS), refs)
class PropertyLineAdd extends Component {
  getInitialState() {
    return {...DEFAULT_STATE, error: this._isExist() ? EXIST_MESSAGE: null };
  }

  render () {
    const {name, count, error} = this.state;
    return (
      <div className={this._getClassName()} onClick={e => e.stopPropagation()}>
        <div className="label" ref="_label" onClick={this._onLabelClick}>
          {'+ add'}
        </div>
        <div className="property-line-add__inputs">
          <div className="name-input-wrapper">
            <input className="input input--name" ref="_name" value={name}
              onKeyUp={this._onNameKeyUp} title="property name" />
            <label className="error-label">{error}</label>
          </div>
          <input className="input input--count" onKeyUp={this._onCountKeyUp}
                 value={count} title="number of properties [1...4]" />
        </div>
        <ToolsPanelButton onClick={this._onSubmit} icon="tick" />
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

  componentDidMount() {
    resetEvent.add((e) => { this.setState({ isAdd: false }); });
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
    const isAdd = (this.state.isAdd) ? 'is-add' : '';
    const valid = (this.state.error == null) ? 'is-valid' : '';

    return `property-line-add ${isAdd} ${valid}`;
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
    const {state} = this.props;
    return state.props[name] != null;
  }
}

export default PropertyLineAdd;
