import { observable, reaction, action } from 'mobx';
import storage from '../storage';
class Config {
  @observable defaultHome;
  @observable cachedHour;
  @observable fontSize;
  constructor() {
    const config = storage.read('reddit_config');
    if (config) {
      this.defaultHome = config.defaultHome || '';
      this.cachedHour = config.cachedHour || 2;
      this.fontSize = config.fontSize || 3;
    }
    reaction(
      () => ({
        defaultHome: this.defaultHome,
        cachedHour: this.cachedHour,
        fontSize: this.fontSize,
      }),
      data => storage.write('reddit_config', data),
    );
  }
  @action
  setDefaultHome(value) {
    this.defaultHome = value;
  }
  @action
  setCachedHour(value) {
    this.cachedHour = value;
  }
  @action
  setFontSize(value) {
    this.fontSize = value;
  }
}
export default new Config();
