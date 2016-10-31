import { h, Component } from 'preact';
import LeftPanel from './left-panel';
import RightPanel from './right-panel';
import {bind} from 'decko';

// temporarily hard-coded, will be removed when reducers will be added
const PLAYER_HEIGHT = '40';

const CLASSES = require('../../../css/blocks/main-panel.postcss.css.json');
require('../../../css/blocks/main-panel');

class MainPanel extends Component {

  getInitialState() {
    const { isHidden, isPlayerPassed } = this.props;
    return {
      isHidden,
      isPlayerPassed,
      ySize:      0,
      mounted:    false,
      isResizing: false
    };
  }

  render () {
    const className = CLASSES['main-panel'],
      isHiddenClassName = this._calcHiddenClassName(),
      isResizingClassName = this.state.isResizing ? CLASSES['main-panel--is-resizing'] : '',
      style = !this.state.mounted ? {} : {'height': this.state.ySize};

    return (
      <section  className={`${className} ${isHiddenClassName} ${isResizingClassName}`}
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

  @bind
  toggleVisibility() {
    this.setState({ isHidden: !this.state.isHidden });
  }

  // TODO: add limitations for resize control
  // to avoid buttons go off the screen
  @bind
  resizeHeightStart(e) {
    console.log(e.deltaY);
    const cursorY = e.center.y,
      body = document.body,
      html = document.documentElement,
      height = Math.max( body.scrollHeight, body.offsetHeight,
                         html.clientHeight, html.scrollHeight, html.offsetHeight );

    let newYSize = Math.max(0, height - cursorY);

    if (this.state.isPlayerPassed) {
      newYSize = newYSize < PLAYER_HEIGHT ? PLAYER_HEIGHT : newYSize;
    }

    this.setState({
      isResizing: true,
      ySize: newYSize
    });
  }

  @bind
  resizeHeightEnd() {
    this.setState({ isResizing: false });
  }

  // setting initial component height to state
  // when reducers will be added this can be removed as well
  componentDidMount() {
    this.setState({
      mounted: true,
      ySize: this.base.offsetHeight
    });
  }
}

export default MainPanel;
