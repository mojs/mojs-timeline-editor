import { h, Component } from 'preact';
import LeftPanel from './left-panel';
import RightPanel from './right-panel';

const CLASSES = require('../../../css/blocks/main-panel.postcss.css.json');
require('../../../css/blocks/main-panel');

class MainPanel extends Component {
  render () {
    const props = this.props;
    const className = CLASSES['main-panel'];
    const transitionClass = props.isSmoothTransition ?
                            CLASSES['main-panel--smooth-transition'] : '';
    
    const style = { 'height': props.ySize };

    return (
      <section className={`${className} ${transitionClass}`}
               style={style}
               data-component="main-panel">

        <LeftPanel/>
        <RightPanel {...this.props}/>
      </section>
    );
  }
}

export default MainPanel;
