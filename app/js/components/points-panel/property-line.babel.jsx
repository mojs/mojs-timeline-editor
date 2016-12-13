import { h, Component } from 'preact';
import {bind} from 'decko';

const CLASSES = require('../../../css/blocks/property-line.postcss.css.json');
require('../../../css/blocks/property-line');

class PropertyLine extends Component {
  render () {
    const p = this.props;

    return (
      <div className={CLASSES['property-line']}>
        <div className={CLASSES['label']}>{p.name}</div>
        <input className={CLASSES['input']} value={this._getValue(p)} />
      </div>
    );
  }

  _getValue(p) {
    const {name, state} = p;
    const {currentProps} = state;

    return currentProps[name];
  }
}

export default PropertyLine;
