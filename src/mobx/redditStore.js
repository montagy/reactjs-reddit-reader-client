import { observable, action, autorun } from 'mobx';
import isEmpty from 'lodash/isEmpty';
import config from './config';
import fetchReddit from '../api';
import { hoursAgo } from '../utils';
import reddits from './reddits';

class RedditStore {
  currentReddit = '';
  nextPageId = '';
  @observable.shallow summaries = [];
  @observable loading = false;
  @observable error = '';
  constructor() {
    autorun(() => {
      if (this.error) {
        setTimeout(
          action('error timeout', () => {
            this.error = '';
          }),
          2000,
        );
      }
    });
  }
  @action.bound
  update(currentReddit) {
    this.loading = true;
    const reddit = reddits.get(currentReddit) || {};
    this.currentReddit = currentReddit;
    this.summaries = [];
    if (
      isEmpty(reddit.data) ||
      hoursAgo(reddit.timestamp) >= config.cachedHour
    ) {
      fetchReddit({ pathPiece: ['r', currentReddit] })
        .then(
          action('update fetch', json => {
            this.nextPageId = json.data.after;
            this.summaries = json.data.children.map(child => child.data);
            reddits.add(currentReddit, json);
          }),
        )
        .catch(
          action('update error', err => {
            this.error = err.toString();
          }),
        )
        .finally(
          action('update finally', () => {
            this.loading = false;
          }),
        );
    } else {
      this.loading = false;
      this.summaries = reddit.data.data.children.map(child => child.data);
      this.nextPageId = reddit.data.data.after;
    }
  }
  @action.bound
  mergeSummaries() {
    const { loading, currentReddit, nextPageId } = this;
    if (!loading && currentReddit && nextPageId) {
      this.loading = true;
      fetchReddit({
        pathPiece: ['r', currentReddit],
        after: nextPageId,
      })
        .then(
          action('handle scroll fetch', json => {
            this.nextPageId = json.data.after;
            const newChildren = json.data.children.map(child => child.data);
            const old = this.summaries;
            this.summaries = old.concat(newChildren);
          }),
        )
        .catch(
          action('handle scroll error', err => {
            this.error = err.toString();
          }),
        )
        .finally(
          action('handle scroll finally', () => {
            this.loading = false;
          }),
        );
    }
  }
}

export default new RedditStore();
