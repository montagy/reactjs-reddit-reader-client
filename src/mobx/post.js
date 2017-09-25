import { observable } from 'mobx';

class Post {
  @observable loading = false;
  @observable article;
  @observable id;
  constructor() {

  }
}
