import React from 'react';
import Pannel from '../molecules/Pannel';
import ToggleButton from '../molecules/ToggleButton';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';

@inject('config', 'reddits')
@observer
export default class PannelContainer extends React.Component {
  @observable showPannel = false;
  @action
  togglePannel() {
    this.showPannel = !this.showPannel;
  }
  handleClick = e => {
    e.preventDefault();
    this.togglePannel();
  };
  handleEsc = e => {
    if (e.keyCode === 27) {
      e.preventDefault();
      this.togglePannel();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }
  render() {
    const { reddits, add } = this.props.reddits;
    const { cachedHour } = this.props.config;
    return (
      <div>
        <Pannel
          addReddit={add}
          cachedHour={cachedHour}
          reddits={reddits}
          active={this.showPannel}
        />
        <ToggleButton active={this.showPannel} onClick={this.handleClick} />
      </div>
    );
  }
}
