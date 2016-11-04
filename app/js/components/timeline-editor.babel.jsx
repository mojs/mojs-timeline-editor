import { h, Component } from 'preact';

import MainPanel from './main-panel/main-panel';
import Icons from './icons';
import C from '../constants';

class TimelineEditor extends Component {
  render () {
    const {store} = this.context;
    const state   = store.getState();

    return (
      <div>
        <Icons />
        <MainPanel state={state.mainPanel} isPlayerPassed={true} />
      </div>
    );
  }

  componentDidMount() {
    const {store} = this.context;
    store.subscribe(this.forceUpdate.bind(this));
  }
}

export default TimelineEditor;
