import { Provider } from 'preact-redux';
import {  render, h } from 'preact';
import TimelineEditor from './components/timeline-editor';


render(
  <Provider store={{}}>
    <TimelineEditor />
  </Provider>,
  document.body
);

// /*
//   API wrapper above the app itself.
// */
// class API {}
// export default API;
// window.MojsTimelineEditor = API;
