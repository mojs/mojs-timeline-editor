import { h, Component } from 'preact';
import Icon from './icon';

const CLASSES = require('../../css/blocks/resize-handle.postcss.css.json');
require('../../css/blocks/resize-handle');

class ResizeHandle extends Component {
  render () {
    const {type} = this.props,
          className = `${CLASSES['resize-handle']}`,
          classType = `${CLASSES['resize-handle--' + type ]}`;
          
    return (
      <div
        className={ `${className} ${classType} ${this.props.className}` }
        data-type={type}
        data-component="resize-handle">
        <Icon shape="ellipsis" />
      </div>
    );
  }
}

export default ResizeHandle;
