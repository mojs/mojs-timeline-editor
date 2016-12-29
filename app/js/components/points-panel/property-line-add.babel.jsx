import { h, Component } from 'preact';
import Hammer from 'hammerjs';
import {bind} from 'decko';

import clamp from '../../helpers/clamp';
import resetEvent from '../../helpers/global-reset-event';


import Icon from '../icon';

const CLS = require('../../../css/blocks/property-line-add.postcss.css.json');
require('../../../css/blocks/property-line-add');

class PropertyLineAdd extends Component {
  getInitialState() {
    return {
      count:    1,
      name:     'property name',
      isAdd:    false,
      isValid:  true
    };
  }
  render () {
    return (
      <div className={this._getClassName()}
          onClick={ e => e.stopPropagation() }>
        <div className={CLS['label']} ref={ el => this._label = el }
              onClick={this._onLabelClick}>
          {'+ add'}
        </div>
        <div className={CLS['property-line-add__inputs']}>
          <input className={`${CLS['input']} ${CLS['input--name']}`}
            ref={ el => this._name = el }
            onKeyUp={this._onNameKeyUp}
            value={this.state.name} title="property name" />

          <input className={`${CLS['input']} ${CLS['input--count']}`}
            value={this.state.count}
            onKeyUp={this._onCountKeyUp}
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
    const code = e.which;
    (code === 13) && this._onSubmit();

    const name = e.target.value;
    const trimmedName = name.trim();
    const isValid = trimmedName.length > 0;
    this.setState({ name, isValid });
  }

  @bind
  _onCountKeyUp(e) {
    const code = e.which;
    if (code === 8) { return; } // backspace
    (code === 13) && this._onSubmit();

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
    const isAdd   = this.state.isAdd ? CLS['is-add'] : '';
    const isValid = this.state.isValid ? CLS['is-valid'] : '';

    return `${CLS['property-line-add']} ${isAdd} ${isValid}`;
  }

  @bind
  _onSubmit() {
    console.log('submit', this.state.isValid);
  }

  @bind
  _onLabelClick(e) { this.setState({ isAdd: true }); }

  componentDidMount() {
    resetEvent.add((e) => { this.setState({ isAdd: false }); });
  }
}

export default PropertyLineAdd;
