import { h, Component } from 'preact';
import Hammer from 'hammerjs';
import propagating from 'propagating-hammerjs';
import Icon from './icon';

const CLASSES = require('../../css/blocks/resize-handle.postcss.css.json');
require('../../css/blocks/resize-handle');

class ResizeHandle extends Component {
  render () {
    return (
      <div className={ CLASSES['resize-handle'] }
           data-component="resize-handle">
        <Icon shape="ellipsis" />
      </div>
    );
  }

  componentDidMount() {
    const mc = propagating(new Hammer.Manager(this.base));

    mc.add(new Hammer.Pan({ threshold: 0 }));
    mc.on('pan', (e) => {
        this.props.onResizeStart(e.deltaY);
        e.stopPropagation();
      })
      .on('panend', (e) => {
        this.props.onResizeEnd(e);
        e.stopPropagation();
      });
  }
}

export default ResizeHandle;
