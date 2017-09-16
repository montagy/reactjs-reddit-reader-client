import React from 'react';
import { func, string, number, object } from 'prop-types';
import fetchReddit from '../../api';
import isEmpty from 'lodash/isEmpty';
import { hoursAgo } from '../../utils';

export const NEED = 1;
export const LOAD = 2;
export const SUCCESS = 3;
export const PAUSE = 4;
export const FAIL = 5;
export const ALREADY = 6;

class StatusButton extends React.PureComponent {
  state = {
    status: NEED,
  };
  static propTypes = {
    sub: string.isRequired,
    addReddit: func,
    reddit: object,
    cachedHour: number,
  };
  handleStatus = () => {
    const status = this.state.status;
    if (status === SUCCESS) {
      this.setState({ status: ALREADY });
    }
  };
  isNeedFetch = (props) => {
    const { reddit, cachedHour } = props;
    if (isEmpty(reddit.data) || hoursAgo(reddit.timestamp) > cachedHour) {
      this.setState({ status: NEED });
    } else {
      this.setState({ status: ALREADY });
    }
  };
  componentDidMount() {
    this.isNeedFetch(this.props);
    setTimeout(this.handleStatus, 2000);
  }

  componentWillReceiveProps(nextProps) {
    this.isNeedFetch(nextProps);
  }
  componentDidUpdate() {
    setTimeout(this.handleStatus, 2000);
  }
  handleClick = () => {
    if (this.state.status === NEED) {
      const { sub, addReddit } = this.props;
      this.setState({ status: LOAD });
      fetchReddit({ pathPiece: ['r', sub] }).then(
        json => {
          addReddit(sub, json);
          this.setState({ status: SUCCESS });
        },
        () => {
          this.setState({ status: FAIL });
        },
      );
    }
  };
  render() {
    const { status } = this.state;
    let child;
    switch (status) {
      case ALREADY:
        child = '已经缓存';
        break;
      case NEED:
        child = '需要获取';
        break;
      case LOAD:
        child = '获取中';
        break;
      case SUCCESS:
        child = '获取成功';
        break;
      case PAUSE:
        child = '暂停中';
        break;
      case FAIL:
        child = '获取失败';
        break;
      default:
        child = '需要获取';
        break;
    }
    return <button onClick={this.handleClick}>{child}</button>;
  }
}

export default StatusButton;
