import storage from './storage';

class Reddit {
  constructor(data) {
    this.timestamp = new Date().getTime();
    this.data = data;
  }
}
const global = (() => {
  let __storage = {};
  return {
    get storage() {
      if(Object.keys(__storage).length === 0) {
        __storage = JSON.parse(storage.read('reddit'));
      }
      return __storage;
    },
    get subReddits() {
      return Object.keys(__storage);
    },
    readReddit(name) {
      return __storage[name] || {};
    },
    addReddit(name, data) {
      const reddit = new Reddit(data);
      __storage[name] = reddit;
      return this;
    },
    removeReddit(name) {
      delete __storage[name];
    },
  };
})();
export default global;
