import { observable, action, toJS, reaction } from 'mobx';
import storage from '../storage';

class Reddits {
  @observable.shallow reddits = new Map();
  constructor() {
    const reddits = storage.read('reddit') || {};
    this.reddits.merge(reddits);
    reaction(
      () => this.reddits,
      () => {
        console.log('local storage write');
        this.save();
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
    this.reddtis.delete(name);
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
