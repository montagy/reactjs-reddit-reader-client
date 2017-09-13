import React from 'react';
import { arrayOf, string } from 'prop-types';
import Pannel from '../molecules/Pannel';
import ToggleButton from '../molecules/ToggleButton';

export default class PannelContainer extends React.Component {
  state = {
    showPannel: false,
  };
  static propTypes = {
    reddits: arrayOf(string),
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
    const { reddits } = this.props;
    const { showPannel } = this.state;
    return (
      <div>
        <Pannel reddits={reddits} active={showPannel} />
        <ToggleButton active={showPannel} handleToggle={this.togglePannel} />
      </div>
    );
  }
}
