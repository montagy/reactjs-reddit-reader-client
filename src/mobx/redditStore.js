import {
  observable,
  action,
  when,
  computed,
  runInAction,
  //reaction,
} from 'mobx';
import isEmpty from 'lodash/isEmpty';
import config from './config';
import fetchReddit from '../api';
import { isScrollAtEnd, hoursAgo } from '../utils';
import reddits from './reddits';

class RedditStore {
  shouldCombine = false;
  @observable loading = false;
  @observable error = '';
  @observable currentReddit = '';
  @observable showFixedHeader = false;
  constructor() {
    when(
      () => this.error,
      () => {
        setTimeout(action(() => {
          this.error = '';
        }), 2000);
      },
    );
    when(
      () => isEmpty(this.reddit) && this.currentReddit,
      () => {
        this.update();
      },
    );
  }
  @computed
  get reddit() {
    return reddits.get(this.currentReddit) || {};
  }
  @computed
  get nextPageId() {
    return (
      (this.reddit && this.reddit.data && this.reddit.data.data.after) || ''
    );
  }
  @computed
  get summaries() {
    return (
      (this.reddit &&
        this.reddit.data &&
        this.reddit.data.data.children.map(child => child.data)) ||
      []
    );
  }
  @action
  setCurrentReddit(value) {
    this.currentReddit = value;
  }
  @action.bound
  update() {
    this.loading = true;
    if (
      isEmpty(this.reddit.data) ||
      hoursAgo(this.reddit.timestamp) >= config.cachedHour
    ) {
      fetchReddit({ pathPiece: ['r', this.currentReddit] })
        .then(
          action(json => {
            reddits.add(this.currentReddit, json);
          }),
        )
        .catch(
          action(err => {
            this.error = err.toString();
          }),
        )
        .finally(
          action(() => {
            this.loading = false;
          }),
        );
    } else {
      this.loading = false;
    }
  }
  @action.bound
  handleScroll(e) {
    const { loading, nextPageId, currentReddit, showFixedHeader } = this;
    e.preventDefault();
    if (isScrollAtEnd() && !loading) {
      this.loading = true;
      fetchReddit({
        pathPiece: ['r', currentReddit],
        after: nextPageId,
      })
        .then(json => {
          this.shouldCombine = true;
          const newChildren = json.data.children;
          const oldChildren = this.reddit.data.data.children;
          const newReddit = { ...this.reddit };
          newReddit.data.children = { ...oldChildren, ...newChildren };
          newReddit.data.data.after = json.data.after;
          console.log(newChildren, oldChildren, newReddit);
          runInAction(() => {
            reddits.reddits.set(currentReddit, newReddit);
          });
        })
        .catch(
          action(err => {
            this.error = err.toString();
          }),
        )
        .finally(() => {
          this.shouldCombine = false;
          runInAction(() => {
            this.loading = false;
          });
        });
    }
    if (
      (e.target.scrollingElement.scrollTop > 200 && !showFixedHeader) ||
      (e.target.scrollingElement.scrollTop <= 200 && showFixedHeader)
    ) {
      this.showFixedHeader = !showFixedHeader;
    }
  }
}

export default new RedditStore();
