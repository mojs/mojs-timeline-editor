import { h, Component } from 'preact';
import LeftPanel from './left-panel';
import RightPanel from './right-panel';

const CLASSES = require('../../../css/blocks/main-panel.postcss.css.json');
require('../../../css/blocks/main-panel');

class MainPanel extends Component {
  constructor(props) {
    super(props);
    const { isHidden, isPlayer } = props;

    this.state = {
      isHidden,
      isPlayer
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  render () {
    const className = CLASSES['main-panel'];
    let isHiddenClass = '',
      isHiddenClassName;

    if (this.state.isHidden) {
      isHiddenClass = 'main-panel--is-hidden';
      isHiddenClass += this.state.isPlayer ? '-with-player' : '-no-player';

      isHiddenClassName = CLASSES[`${isHiddenClass}`];
    }

    return (
      <section className={`${className} ${isHiddenClassName}`}
        data-component="main-panel">
        <LeftPanel/>
        <RightPanel onHideBtnClick={this.toggleVisibility}/>
      </section>
    );
  }
}

export default MainPanel;
