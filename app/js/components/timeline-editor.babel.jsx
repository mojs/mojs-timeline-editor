import { h, Component } from 'preact';
const CLASSES = require('../../css/blocks/timeline-editor.postcss.css.json');
require('../../css/blocks/timeline-editor');

class TimelineEditor extends Component {
  render () {
    return  <div className={CLASSES['timeline-editor']}
                 data-component="timeline-editor">
            </div>;
  }
}

export default TimelineEditor;