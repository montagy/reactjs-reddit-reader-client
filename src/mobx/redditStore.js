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
import throttle from 'lodash/throttle';
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
        setTimeout(() => {
          this.error = '';
        }, 2000);
      },
    );
    /*
     *when(
     *  () => this.currentReddit,
     *  () => {
     *    this.update();
     *  },
     *);
     */
  }
  @computed
  get reddit() {
    return reddits.get(this.currentReddit) || {};
  }
  @computed
  get nextPageId() {
    return (this.reddit && this.reddit.data.data.after) || '';
  }
  @computed
  get summaries() {
    return (
      (this.reddit &&
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
  @action.bound
  handleScroll() {
    return throttle(
      e => {
        const { loading, nextPageId, currentReddit, showFixedHeader } = this;
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
                  reddits.reddits.set(currentReddit, newReddit);
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
}

export default new RedditStore();
