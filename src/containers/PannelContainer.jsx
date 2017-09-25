import React from 'react';
import Pannel from '../molecules/Pannel';
import ToggleButton from '../molecules/ToggleButton';
import { inject, observer} from 'mobx-react';

@inject('config', 'reddits')
@observer
export default class PannelContainer extends React.Component {
  state = {
    showPannel: false,
  };
  togglePannel = e => {
    e.preventDefault();
    this.setState(prevState => ({
      showPannel: !prevState.showPannel,
    }));
  };
  handleEsc = event => {
    if (event.keyCode === 27) {
      event.preventDefault();
      this.setState(prevState => ({
        showPannel: !prevState.showPannel,
      }));
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }
  render() {
    const { reddits, add} = this.props.reddits;
    const { cachedHour } = this.props.config;
    const { showPannel } = this.state;
    return (
      <div>
        <Pannel
          addReddit={add}
          cachedHour={cachedHour}
          reddits={reddits}
          active={showPannel}
        />
        <ToggleButton active={showPannel} onClick={this.togglePannel} />
      </div>
    );
  }
}
