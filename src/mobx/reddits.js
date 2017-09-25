import { observable, action } from 'mobx';
import storage from '../storage';

class Reddits {
  @observable reddits = new Map();
  constructor() {
    const reddits = storage.read('reddit');
    if (reddits) this.reddits.merge(reddits);
  }
  @action.bound
  add(name, data) {
    this.reddtis.set(name, {
      timestamp: new Date().getTime(),
      data,
    });
  }
  @action.bound
  delete(name){
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
    storage.write('reddit', this.reddits);
  }
  /*
   *@action.bound
   *update(name, data) {
   *  const old = this.reddits.get(name);
   *}
   */
}

export default new Reddits();
