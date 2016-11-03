import { h, Component } from 'preact';
import { bind } from 'decko';
import Icon from './icon';

const CLASSES = require('../../css/blocks/hide-button.postcss.css.json');
require('../../css/blocks/hide-button');

class HideButton extends Component {
  @bind
  changeVisibility() {
    this.props.onHideBtnClick();
  }

  render () {
    const className = CLASSES['hide-button'];
    const isHiddenModeClassName = this.props.isHiddenMode ?
                                  CLASSES['hide-button--is-hidden'] : '';

    return (
      <div className={`${className} ${isHiddenModeClassName}`}
           data-component="hide-button"
           onClick={this.changeVisibility}>
        <div className={CLASSES['hide-button__icon-container']}></div>
        <Icon shape="hide-icon"/>
      </div>
    );
  }
}

export default HideButton;
