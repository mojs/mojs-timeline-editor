import { h, Component } from 'preact';
import LeftPanel from './left-panel';
import RightPanel from './right-panel';

const CLASSES = require('../../../css/blocks/main-panel.postcss.css.json');
require('../../../css/blocks/main-panel');

class MainPanel extends Component {
  render () {
    return (
      <section className={CLASSES['main-panel']}>
        <LeftPanel/>
        <RightPanel/>
      </section>
    );
  }
}

export default MainPanel;
