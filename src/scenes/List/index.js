// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import ReactList from 'react-list';

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
  renderPost = (index: number, key: number) => {
    const post = this.props.postStore.posts[index];
    return <li key={key}><Link to={`post/${post.sha}`}>{post.title}</Link></li>;
  };
  render () {
    const { posts } = this.props.postStore;
    return (
      <div>
        <h1>Post list</h1>
        <div style={{ maxHeight: 400 }}>
          <ul>
            <ReactList
              itemRenderer={this.renderPost}
              length={this.props.postStore.posts.length}
            />
            {/* {posts.map(post => (
              <li key={post.sha}>
                <Link to={`post/${post.sha}`}>{post.name}</Link>
              </li>
            ))} */}
          </ul>
        </div>
      </div>
    );
  }
}
