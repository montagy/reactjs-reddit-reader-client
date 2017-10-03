import { observable, action, toJS, reaction } from 'mobx';
import storage from '../storage';
import config from './config';
import { hoursAgo } from '../utils';

class Reddits {
  @observable.shallow reddits = new Map();
  constructor() {
    const reddits = storage.read('reddit') || {};
    this.reddits.merge(reddits);
    reaction(
      () => toJS(this.reddits),
      data => {
        storage.write('reddit', data);
      },
    );
  }
  @action.bound
  add(name, data) {
    this.reddits.set(name, {
      timestamp: new Date().getTime(),
      data,
    });
  }
  @action.bound
  delete(name) {
    this.reddits.delete(name);
  }
  @action.bound
  cleanCache() {
    this.reddits.clear();
    storage.remove('reddit');
  }
  get(name) {
    return this.reddits.get(name) || {};
  }
  isNeedFetch(name) {
    const reddit = this.get(name);
    return (!reddit.data || hoursAgo(reddit.timestamp) > config.cachedHour)
  }
}

export default new Reddits();
