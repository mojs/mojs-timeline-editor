import { Provider } from 'preact-redux';
import {  render, h } from 'preact';
import Icon from './components/icon';
import TimelineEditor from './components/timeline-editor';

render(
  <Provider store={{}}>
    <TimelineEditor>
      <Icon shape="mojs-logo"/>
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
