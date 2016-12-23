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
        <input className={CLASSES['input']} value={this._getValue(p)} />
        <div className={CLASSES['button']} onClick={this._onAddSpot}>
          <div className={CLASSES['button__inner']}>
            <Icon shape="spot" />
          </div>
        </div>
      </div>
    );
  }

  _getValue(p) {
    const {name, state} = p;
    const {currentProps} = state;

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
