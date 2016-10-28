import { h, Component } from 'preact';
import Icon from './icon';

const CLASSES = require('../../css/blocks/hide-button.postcss.css.json');
require('../../css/blocks/hide-button');

class HideButton extends Component {
  constructor() {
    super();
    this.state.isHiddenMode = false;
    this.changeVisibility = this.changeVisibility.bind(this);
  }

  changeVisibility() {
    this.setState({
      isHiddenMode: !this.state.isHiddenMode
    });
    this.props.onHideBtnClick();
  }

  render () {
    const className = CLASSES['hide-button'];
    const isHiddenModeClassName = this.state.isHiddenMode ? CLASSES['hide-button--is-hidden'] : '';

    return (
      <div
        className={`${className} ${isHiddenModeClassName}`}
        data-component="hide-button"
        onClick={this.changeVisibility}>
        <div className={CLASSES['hide-button__icon-container']}></div>
        <Icon shape="hide-icon"/>
      </div>
    );
  }
}

export default HideButton;
