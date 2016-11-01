import { Provider } from 'preact-redux';
import {  render, h } from 'preact';

import TimelineEditor from './components/timeline-editor';
import MainPanelContainer from './components/main-panel/main-panel-container';

render(
  <Provider store={{}}>
    <TimelineEditor>
      <MainPanelContainer isPlayerPassed={true}/>
    </TimelineEditor>
  </Provider>,
  document.body
);

// /*
//   API wrapper above the app itself.
// */
// class API {}
// export default API;
// window.MojsTimelineEditor = API;
