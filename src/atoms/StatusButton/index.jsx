import React from 'react';

export const NORMAL = 1;
export const LOAD = 2;
export const SUCCESS = 3;
export const PAUSE = 4;
export const FAIL = 5;

class StatusButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentStatus: this.props.status,
    };
  }
  handleStatus = () => {
    const currentStatus = this.state.currentStatus;
    if (currentStatus === SUCCESS) {
      this.setState({ currentStatus: NORMAL });
    }
    if (currentStatus === PAUSE) {
      this.setState({ currentStatus: NORMAL });
    }
  };
  componentDidMount() {
    setTimeout(this.handleStatus, 2000);
  }

  componentDidUpdate() {
    setTimeout(this.handleStatus, 2000);
  }
  handleClick = () => {
    this.setState(prev => ({
      currentStatus: Math.min(prev.currentStatus + 1, FAIL),
    }));
  };
  render() {
    const { currentStatus } = this.state;
    let child;
    switch (currentStatus) {
      case NORMAL:
        child = 'NORMAL';
        break;
      case LOAD:
        child = 'LOAD';
        break;
      case SUCCESS:
        child = 'SUCCESS';
        break;
      case PAUSE:
        child = 'PAUSE';
        break;
      case FAIL:
        child = 'FAIL';
        break;
      default:
        child = 'NORMAL';
        break;
    }
    return <button onClick={this.handleClick}>{child}</button>;
  }
}

export default StatusButton;
