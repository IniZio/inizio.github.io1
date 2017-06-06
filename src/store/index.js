// @flow
import Axios from 'axios'
import { observable, computed, action } from 'mobx'
import fm from 'front-matter'

import { objReduce, capitalize } from '../util'
import { getListUrl, getPostUrl } from './api'

const markdownIt = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang) {
      try {
        return '<pre class="code"><code>' + str + '</code></pre>'
      } catch (__) {}
    }

    return '<pre class="code"><code>' + str + '</code></pre>'
  }
})

export class Post {
  @observable name: string;
  @observable sha: string;
  @observable size: number;
  @observable body: string;
  @observable attributes: {
    filename: string,
    title: string,
    date: string,
    tags: string[],
    category: string
  };

  @computed get title (): string {
    return this.name
      ? capitalize(
          this.name.replace(/\.md$/, '').replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '')
        )
      : ''
  }
  @computed get date (): string {
    return /^\d{4}-\d{1,2}-\d{1,2}/.exec(this.name)
      ? /^\d{4}-\d{1,2}-\d{1,2}/.exec(this.name)[0]
      : ''
  }
  @computed get html (): string {
    return this.body ? markdownIt.render(this.body) : ''
  }
  constructor (post?: Object) {
    Object.assign(this, post)
  }
  /**
   * Fetch post detail by sha
   *
   * @param {string} sha
   * @returns {Promise}
   *
   * @memberof Post
   */
  @action fetchDetail (): Promise<any> {
    return new Promise((resolve, reject) => {
      const cacheKey = `post.${this.sha}`
      let post
      if (this.body) resolve(this)
      if (
        window.sessionStorage && window.sessionStorage.hasOwnProperty(cacheKey)
      ) {
        post = JSON.parse(window.sessionStorage.getItem(cacheKey))
        if (!this.name && post.attributes.date && post.attributes.title) {
          post.name = `${post.attributes.date.substring(0, 10)}-${post.attributes.title}.md`
        }
        Object.assign(this, post)
        resolve(this)
      } else {
        Axios.get(getPostUrl(this.sha), {
          headers: { Accept: 'application/vnd.github.v3.raw' }
        }).then(res => {
          post = fm(res.data)
          if (!this.name && post.attributes.date && post.attributes.title) {
            post.name = `${post.attributes.date
              .toISOString()
              .substring(0, 10)}-${post.attributes.title}.md`
          }
          Object.assign(this, post)
          window.sessionStorage &&
            window.sessionStorage.setItem(cacheKey, JSON.stringify(post))
          resolve(this)
        }, reject)
      }
    })
  }
}

export class PostStore {
  @observable posts: Post[] = [];

  /**
   * Fetch brief posts
   *
   * @returns {Promise}
   *
   * @memberof PostStore
   */
  @action fetchList (): Promise<any> {
    return new Promise((resolve, reject) => {
      if (
        window.sessionStorage && window.sessionStorage.hasOwnProperty('posts')
      ) {
        // Get from session storage
        const posts = JSON.parse(window.sessionStorage.getItem('posts'))
        this.posts = posts.map(post => new Post(post))
        resolve(posts)
      } else {
        Axios.get(getListUrl()).then(res => {
          const posts = res.data
            .reverse()
            .map(els => new Post(objReduce(els, ['name', 'sha', 'size'])))
          // Save into sessionStorage
          window.sessionStorage &&
            window.sessionStorage.setItem('posts', JSON.stringify(posts))
          // ..then return
          this.posts = posts
          resolve(posts)
        }, reject)
      }
    })
  }
}

export default {
  postStore: new PostStore()
}
