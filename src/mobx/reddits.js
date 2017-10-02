import { observable, action, toJS } from 'mobx';
import storage from '../storage';

class Reddits {
  @observable.shallow reddits = new Map();
  constructor() {
    const reddits = storage.read('reddit') || {};
    this.reddits.merge(reddits);
    this.reddits.observe(() => {
      this.save();
    });
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
    return this.reddits.get(name);
  }
  save() {
    storage.write('reddit', toJS(this.reddits));
  }
}

export default new Reddits();
