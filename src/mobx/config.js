import { observable, reaction, action } from 'mobx';
import storage from '../storage';
import { isValidReddit } from '../api';
class Config {
  @observable defaultHome = '';
  @observable cachedHour = 2;
  @observable fontSize = 3;
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
  @action.bound
  setDefaultHome(value) {
    isValidReddit(value).then(
      action('valid reddit', () => {
        this.defaultHome = value;
      }),
    ).catch(() => {
      console.log('error');
    });
  }
  @action.bound
  setCachedHour(value) {
    this.cachedHour = value;
  }
  @action.bound
  setFontSize(value) {
    this.fontSize = value;
  }
}
export default new Config();
