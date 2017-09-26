import { observable, action, toJS } from 'mobx';
import storage from '../storage';

class Reddits {
  @observable reddits = observable.map();
  constructor() {
    const reddits = storage.read('reddit');
    if (reddits) this.reddits.merge(reddits);
  }
  @action.bound
  add(name, data) {
    this.reddits.set(name, {
      timestamp: new Date().getTime(),
      data,
    });
    this.save();
  }
  @action.bound
  delete(name){
    this.reddtis.delete(name);
    this.save()
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
