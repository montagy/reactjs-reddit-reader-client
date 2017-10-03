import React from 'react';
import fetchReddit from '../../api';
import { observer, inject } from 'mobx-react';
import { observable, action, reaction } from 'mobx';

export const NEED = 1;
export const LOAD = 2;
export const SUCCESS = 3;
export const PAUSE = 4;
export const FAIL = 5;
export const ALREADY = 6;

@inject('config', 'reddits', 'redditStore')
@observer
class StatusButton extends React.PureComponent {
  @observable status = NEED;
  constructor(props) {
    super(props);
    const { name } = props;
    if (props.reddits.isNeedFetch(name)) {
      this.setStatus(NEED);
    } else {
      this.setStatus(ALREADY);
    }
    reaction(
      () => this.status,
      () => {
        if (this.status === SUCCESS) {
          setTimeout(() => {
            this.setStatus(ALREADY);
          }, 2000);
        }
      },
    );
  }
  @action
  setStatus(value) {
    this.status = value;
  }
  @action.bound
  update() {
    if (this.status === NEED) {
      const { name } = this.props;
      const { add } = this.props.reddits;
      this.setStatus(LOAD);
      fetchReddit({ pathPiece: ['r', name] }).then(
        action('status button fetch success', json => {
          add(name, json);
          this.setStatus(SUCCESS);
        }),
        action('status button fetch fail', () => {
          this.setStatus(FAIL);
        }),
      );
    }
  }
  render() {
    let child;
    switch (this.status) {
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
    return <button onClick={this.update}>{child}</button>;
  }
}

export default StatusButton;
