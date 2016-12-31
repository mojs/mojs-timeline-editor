import {Provider} from 'preact-redux';
import {render, h} from 'preact';
import mojs from 'mo-js';
import MojsPlayer from 'mojs-player';

import store from './store';
import TimelineEditor from './components/timeline-editor';
import persist from './helpers/persist';

/* TODO:
    [x] add error message for property line name
    [x] point-timleine.babel.jsx add animation
        when start/end points got selected
    [x] test if `onClick` handler on components is optimized for mobiles
*/

render(
  <Provider store={store}>
    <TimelineEditor isPlayerPassed={true} />
  </Provider>,
  document.body
);

persist(store);

new MojsPlayer({ add: new mojs.Tween });

// /*
//   API wrapper above the app itself.
// */
// class API {}
// export default API;
// window.MojsTimelineEditor = API;
