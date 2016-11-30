import { h, Component } from 'preact';
import {bind} from 'decko';

const CLASSES = require('../../../css/blocks/property-line.postcss.css.json');
require('../../../css/blocks/property-line');

class PropertyLine extends Component {
  render () {
    const {state} = this.props;

    return (
      <div className={CLASSES['property-line']}>
        <div className={CLASSES['label']}>x</div>
        <input className={CLASSES['input']} value="623" />
      </div>
    );
  }
}

export default PropertyLine;
