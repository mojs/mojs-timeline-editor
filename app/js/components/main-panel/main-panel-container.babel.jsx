import { h, Component } from 'preact';
import { bind } from 'decko';

import MainPanel from './main-panel';

// temporarily hard-coded, will be removed when reducers will be added
// next values set in px
const PLAYER_HEIGHT = 40;

class MainPanelContainer extends Component {

  getInitialState() {
    return {
      ySize: 100,
      isSmoothTransition: false,
      isHiddenMode: false,
      prevDeltaY: 0,
      prevHeight: 0
    };
  }

  render () {
    return (
      <MainPanel {...this.state}
                 onHideBtnClick={this._toggleVisibility}
                 onResizeStart={this._resizeHeightStart}
                 onResizeEnd={this._resizeHeightEnd}/>
    );
  }

  @bind
  _toggleVisibility() {
    const isHiddenMode = this.state.isHiddenMode;

    // tried to implement it in a more elegant manner
    // but this is still the best variant I got
    if (isHiddenMode) {
      this._updateHeight(this.state.prevHeight, true, !isHiddenMode);
      this.setState({ prevHeight: 0});
    } else {
      let newYSize = this.props.isPlayerPassed ? PLAYER_HEIGHT : 0;
      this.setState({ prevHeight: this.state.ySize});
      this._updateHeight(newYSize, true, !isHiddenMode);
    }
  }

  @bind
  _resizeHeightStart(deltaY) {
    const maxEditorSize = document.documentElement.clientHeight - 16;
    let newYSize = this.state.ySize + (this.state.prevDeltaY - deltaY);

    if (this.props.isPlayerPassed && newYSize < PLAYER_HEIGHT) {
      newYSize = PLAYER_HEIGHT;
    }

    if (this.state.ySize > maxEditorSize) {
      newYSize = maxEditorSize;
    } else {
      // keep updating prevDeltaY and increasing height
      //  while it's between max Height min MainPanel height
      this.setState({ prevDeltaY: deltaY});
    }

    this._updateHeight(newYSize, false, false);
  }

  @bind
  _resizeHeightEnd() {
    this.setState({
      prevDeltaY: 0,
      prevHeight: 0
    });
  }

  @bind
  _updateHeight(ySize, isSmoothTransition, isHiddenMode) {
    this.setState({
      ySize,
      isSmoothTransition,
      isHiddenMode
    });
  }
}

export default MainPanelContainer;
