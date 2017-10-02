import { observable, action, computed, autorun } from 'mobx';
import fetchReddit from '../api';

class Post {
  @observable loading = true;
  @observable.shallow article = [];
  @observable id = '';
  constructor() {
    autorun(() => {
      if (this.id) {
        this.update();
        this.setId('');
      }
    });
  }
  @action
  update() {
    this.loading = true;
    this.article = [];
    fetchReddit({ pathPiece: [this.id] })
      .then(
        action('fetch success', json => {
          this.article = json;
        }),
      )
      .catch(action('fetch error', err => {}))
      .finally(
        action('fetch complete', () => {
          this.loading = false;
        }),
      );
  }
  @computed
  get post() {
    return (
      (this.article.length > 1 && this.article[0].data.children[0].data) || {}
    );
  }
  @computed
  get comments() {
    return (
      (this.article.length > 1 &&
        this.article[1].data.children.map(child => child.data)) ||
      []
    );
  }
  @action
  setId(value) {
    this.id = value;
  }
}

export default new Post();
