import { h, Component } from 'preact';
import Icon from './icon';

const CLASSES = require('../../css/blocks/hide-button.postcss.css.json');
require('../../css/blocks/hide-button');

class HideButton extends Component {
  render () {
    return (
      <div 
        className={CLASSES['hide-button']}
        data-component="hide-button">
        <div className={CLASSES['hide-button__icon-container']}></div>
        <Icon shape="hide-icon"/>
      </div>
    );
  }
}

export default HideButton;
