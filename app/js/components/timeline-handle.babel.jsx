import { h, Component } from 'preact';
import Hammer from 'hammerjs';

import Icon from './icon';

const CLASSES = require('../../css/blocks/timeline-handle.postcss.css.json');
require('../../css/blocks/timeline-handle');

class TimelineHandle extends Component {
  render() {
    const {state} = this.props;
    const style = { transform: `translateX(${state.progress}em)` };
    // console.log( state.progress );

    return (
      <div className={CLASSES['timeline-handle']} style={style}
           data-component="timeline-handle">
        <div className={CLASSES['timeline-handle__head']}
              ref={ (el) => { this._head = el; } }>
          <Icon shape="handle" />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const mc = new Hammer.Manager(this._head);
    mc.add(new Hammer.Pan);

    const {store} = this.context;
    mc.on('pan', (e) => {
      store.dispatch({ type: 'SET_PROGRESS', data: e.deltaX });
    });
  }

}

export default TimelineHandle;
