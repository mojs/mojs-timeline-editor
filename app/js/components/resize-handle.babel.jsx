import { h, Component } from 'preact';
import Hammer from 'hammerjs';
import propagating from 'propagating-hammerjs';
import Icon from './icon';

const CLASSES = require('../../css/blocks/resize-handle.postcss.css.json');
require('../../css/blocks/resize-handle');

class ResizeHandle extends Component {
  render() {
    return (
      <div className={CLASSES['resize-handle']} data-component="resize-handle">
        <Icon shape="ellipsis" />
      </div>
    );
  }

  componentDidMount() {
    const mc = propagating(new Hammer.Manager(this.base));
    const p = this.props;
    const {store} = this.context;

    mc.add(new Hammer.Pan({ threshold: 0 }));
    mc.on('pan', (e) => { p.onResize(e.deltaY); e.stopPropagation(); })

    .on('panstart', (e) => {
      p.onResizeStart && p.onResizeStart(e);
      e.stopPropagation();
    }).on('panend', (e) => {
      p.onResizeEnd && p.onResizeEnd(e);
      e.stopPropagation();
    });
    
  }
}

export default ResizeHandle;
