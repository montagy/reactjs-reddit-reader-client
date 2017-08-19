import storage from './storage';

class Reddit {
  constructor(data) {
    this.timestamp = new Date().getTime();
    this.data = data;
  }
}
class RedditInDisk {
  constructor() {
    this._reddits = storage.read('reddit') || {};
  }
  readReddit(name) {
    return this._reddits[name] || {};
  }
  addReddit(name, data) {
    const reddit = new Reddit(data);
    this._reddits[name] = reddit;
    return this;
  }
  removeReddit(name) {
    delete this._reddits[name];
    return this;
  }
  updateReddit(name, data) {
    return this.addReddit(name, data);
  }
  getKeys() {
    return Object.keys(this._reddits);
  }
  store() {
    storage.write('reddit', this._reddits);
  }
}

export default RedditInDisk;
