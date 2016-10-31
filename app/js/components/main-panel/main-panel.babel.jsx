import { h, Component } from 'preact';
import LeftPanel from './left-panel';
import RightPanel from './right-panel';

const CLASSES = require('../../../css/blocks/main-panel.postcss.css.json');
// temporarily hard-coded, will be removed when reducers will be added
const PLAYER_HEIGHT = '40';
require('../../../css/blocks/main-panel');

class MainPanel extends Component {
  constructor(props) {
    super(props);
    const { isHidden, isPlayerPassed } = props;

    this.state = {
      isHidden,
      isPlayerPassed,
      ySize: 0,
      mounted: false,
      isResizing: false
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.resizeHeightStart = this.resizeHeightStart.bind(this);
    this.resizeHeightEnd = this.resizeHeightEnd.bind(this);
  }

  render () {
    const className = CLASSES['main-panel'],
      isHiddenClassName = this._calcHiddenClassName(),
      isResizingClassName = this.state.isResizing ? CLASSES['main-panel--is-resizing'] : '',
      style = !this.state.mounted ? {} : {'height': this.state.ySize};

    return (
      <section className={`${className} ${isHiddenClassName} ${isResizingClassName}`}
        style={style}
        data-component="main-panel">
        <LeftPanel/>
        <RightPanel onHideBtnClick={this.toggleVisibility}
          onResizeStart={this.resizeHeightStart}
          onResizeEnd={this.resizeHeightEnd}/>
      </section>
    );
  }

  _calcHiddenClassName() {
    let isHiddenClass = '';

    if (this.state.isHidden) {
      isHiddenClass = 'main-panel--is-hidden';
      isHiddenClass += this.state.isPlayerPassed ? '-with-player' : '-no-player';

      return CLASSES[`${isHiddenClass}`];
    }

    return '';
  }

  toggleVisibility() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  // TODO: add limitations for resize control
  // to avoid buttons go off the screen
  resizeHeightStart(e) {
    const cursorY = e.center.y,
      body = document.body,
      html = document.documentElement,
      height = Math.max( body.scrollHeight, body.offsetHeight,
                         html.clientHeight, html.scrollHeight, html.offsetHeight );

    let newYSize = Math.abs(height - cursorY);

    if (this.state.isPlayerPassed) {
      newYSize = newYSize < PLAYER_HEIGHT ? PLAYER_HEIGHT : newYSize;
    }

    this.setState({
      isResizing: true,
      ySize: newYSize
    });
  }

  resizeHeightEnd() {
    this.setState({
      isResizing: false
    });
  }

  // setting initial component height to state
  // when reducers will be added this can be removed as well
  componentDidMount() {
    let elem = document.querySelector('[data-component="main-panel"]');
    this.setState({
      mounted: true,
      ySize: elem.offsetHeight
    });
  }
}

export default MainPanel;
