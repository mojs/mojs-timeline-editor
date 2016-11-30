import {Provider} from 'preact-redux';
import {render, h} from 'preact';

import store from './store';
import TimelineEditor from './components/timeline-editor';
import persist from './helpers/persist';

/* TODO:
    [x] test if `onClick` handler on components is optimized for mobiles
*/

render(
  <Provider store={store}>
    <TimelineEditor isPlayerPassed={true} />
  </Provider>,
  document.body
);

persist(store);

// /*
//   API wrapper above the app itself.
// */
// class API {}
// export default API;
// window.MojsTimelineEditor = API;
