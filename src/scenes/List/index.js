// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { PostStore } from '../../store';

/**
 * @export
 * @class List
 * @extends {Component}
 */
@observer
export default class List extends Component {
  props: {
    postStore: PostStore
  };
  componentDidMount () {
    this.props.postStore.fetchList();
  }
  render () {
    const { posts } = this.props.postStore;
    return (
      <div>
        <h1>Post list</h1>
        <ul>
          {posts.map(post => (
            <li key={post.sha}>
              <Link to={`post/${post.sha}`}>{post.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
