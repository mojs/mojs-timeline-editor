import {h, Component} from 'preact';
import {classNames} from '../helpers/style-decorator';
import MojsCurveEditor from 'mojs-curve-editor';

const CLASSES = require('../../css/blocks/curve-editor.postcss.css.json');
require('../../css/blocks/curve-editor');

@classNames(CLASSES)
class CurveEditor extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<div className="curve-editor" />);
  }

  componentDidMount() {
    const {meta} = this.props;
    const {id, spotIndex} = meta;

    this._editor = new MojsCurveEditor({
      name: `timeline_editor_curve_${id}_${spotIndex}`,
      isHiddenOnMin: true,
      onChange: this._onChange
    });
  }

  _onChange(path) {
    console.log(path);
  }

  componentWillUnmount() {
    console.log('will unmount');
  }

  componentDidUnmount() {
    console.log('did unmount');
  }
}

export default CurveEditor;
