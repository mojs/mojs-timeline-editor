import { h, Component } from 'preact';
const CLASSES = require('../../css/blocks/icon.postcss.css.json');
require('../../css/blocks/icon');

class Icon extends Component {
  render () {
    const {shape} = this.props,
          markup = `<svg viewBox="0 0 32 32"><use xlink:href="#${shape}-shape" /></svg>`;
    return  <div
                className={CLASSES['icon']}
                data-component="icon"
                dangerouslySetInnerHTML={{ __html: markup }}>
                
            </div>;
  }
}

export default Icon;