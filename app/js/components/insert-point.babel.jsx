import { h, Component } from 'preact';
import {bind} from 'decko';

const CLASSES = require('../../css/blocks/insert-point.postcss.css.json');
require('../../css/blocks/insert-point');

class Point extends Component {
  render () {
    const {state} = this.props;
    const style  = {
      display: (this._isVisible()) ? 'block' : 'none',
      transform: `translate(${this.state.x}px, ${this.state.y}px)`
    };

    return (
      <div  style={style}
            onClick={this._addPoint}
            className={CLASSES['insert-point']} data-component="insert-point" >
      </div>
    );
  }

  /* Method to find out if the insert point should be visible. */
  _isVisible() {
    const {controls} = this.props.state;
    const {selected} = controls;
    const isPlus = selected === 'plus';
    const isOut  = !controls.isMouseInside;
    return isOut && isPlus;
  }

  @bind
  _addPoint() {
    const {store} = this.context;
    const {state} = this.props;
    store.dispatch({
      type: 'ADD_POINT',
      data: { ...this.state, time: state.progress }
    });
  }

  @bind
  _mouseMove(e) {
    if (!this._isVisible()) { return; }
    const { pageX: x, pageY: y } = e;
    this.setState({x, y});
  }

  componentWillMount() { this.setState({ x: 0, y:0 }); }

  componentDidMount() {
    document.addEventListener('mousemove', this._mouseMove);
  }

}

export default Point;
