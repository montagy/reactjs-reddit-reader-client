import {
  observable,
  action,
  when,
  computed,
  runInAction,
  toJS,
  reaction,
} from 'mobx';
import isEmpty from 'lodash/isEmpty';
import storage from '../storage';
import config from './config';
import fetchReddit from '../api';
import throttle from 'lodash/throttle';
import { isScrollAtEnd, scrollToEnd, hoursAgo } from '../utils';

class RedditStore {
  shouldCombine = false;
  @observable reddits = new Map();
  @observable loading = false;
  @observable error = '';
  @observable currentReddit = '';
  @observable showFixedHeader = false;
  constructor() {
    const reddits = storage.read('reddit');
    if (reddits) this.reddits.merge(reddits);
    reaction(
      () => toJS(this.reddits),
      data => {
        storage.write('reddit', data);
      },
    );
    when(
      () => this.error,
      () => {
        setTimeout(() => {
          this.error = '';
        }, 2000);
      },
    );
    when(
      () => this.currentReddit,
      () => {
        this.update();
      },
    );
  }
  @computed
  get nextPageId() {
    const reddit = this.reddits.get(this.currentReddit);
    return (reddit && reddit.data.data.after) || '';
  }
  @computed
  get summaries() {
    const reddit = this.reddits.get(this.currentReddit);
    return (reddit && reddit.data.data.children.map(child => child.data)) || [];
  }
  @computed
  get reddit() {
    return this.reddits.get(this.currentReddit) || {};
  }
  @action
  setCurrentReddit(value) {
    this.currentReddit = value;
  }
  @action
  addReddit(name, data) {
    this.reddits.set(name, {
      timestamp: new Date().getTime(),
      data,
    });
  }
  @action
  deleteReddit(name) {
    this.reddits.delete(name);
  }
  @action
  cleanCache() {
    this.reddits.clear();
  }
  @action
  update() {
    this.loading = true;
    if (
      isEmpty(this.reddit.data) ||
      hoursAgo(this.reddit.timestamp) >= config.cachedHour
    ) {
      fetchReddit({ pathPiece: ['r', this.currentReddit] })
        .then(
          json => {
            runInAction(() => {
              this.addReddit(this.currentReddit, json);
            });
          },
          err => {
            runInAction(() => {
              this.error = err.toString();
            });
          },
        )
        .finally(() => {
          runInAction(() => {
            this.loading = false;
          });
        });
    } else {
      this.loading = false;
    }
  }
  @action
  handleScroll = throttle(
    e => {
      const {
        reddits,
        loading,
        nextPageId,
        currentReddit,
        showFixedHeader,
      } = this;
      e.preventDefault();
      if (isScrollAtEnd() && !loading) {
        runInAction(() => {
          this.loading = true;
        });
        fetchReddit({
          pathPiece: ['r', currentReddit],
          after: nextPageId,
        })
          .then(
            json => {
              runInAction(() => {
                this.shouldCombine = true;
                const newChildren = json.data.children;
                const oldChildren = this.reddit.data.data.children;
                const newReddit = { ...this.reddit };
                newReddit.data.children = oldChildren.concat(newChildren);
                this.reddits.set(currentReddit, newReddit);
              });
            },
            err => {
              runInAction(() => {
                this.error = err.toString();
              });
            },
          )
          .finally(() => {
            runInAction(() => {
              this.loading = false;
              this.shouldCombine = false;
            });
          });
      }
      if (
        (e.target.scrollingElement.scrollTop > 200 && !showFixedHeader) ||
        (e.target.scrollingElement.scrollTop <= 200 && showFixedHeader)
      ) {
        runInAction(() => {
          this.showFixedHeader = !showFixedHeader;
        });
      }
    },
    500,
    { leading: true },
  );
}

export default new RedditStore();
