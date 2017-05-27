import { observable, computed } from 'mobx';

export class Post {
  @observable title;
}

export default class Store {
  @observable posts = [];
}
