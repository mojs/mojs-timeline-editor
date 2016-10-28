import { h, Component } from 'preact';
import HideButton from '../hide-button';
import ResizeHandle from '../resize-handle';

const CLASSES = require('../../../css/blocks/right-panel.postcss.css.json');
require('../../../css/blocks/right-panel');

class RightPanel extends Component {
  render () {
    return (
      <div className={CLASSES['right-panel']}>
        <HideButton/>
        <ResizeHandle/>
      </div>
    );
  }
}

export default RightPanel;
