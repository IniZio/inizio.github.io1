// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
// import ReactList from 'react-list';

import { PostStore } from '../../store';

import SearchBar from './components/SearchBar';

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
  state = {
    keyword: ''
  };
  componentDidMount() {
    this.props.postStore.fetchList();
  }
  handleKeywordChange = (keyword: string) => {
    this.setState({ keyword });
  };
  /* renderPost = (index: number, key: number) => {
    const post = this.props.postStore.posts.filter(post =>
      post.title.match(this.state.keyword)
    )[index];
    return (
      <div key={key} className='c-list__item'>
        <Link to={`post/${post.sha}`}>{post.title}</Link>
      </div>
    );
  }; */
  render() {
    const posts = this.props.postStore.posts.filter(post =>
      post.title
        .toLowerCase()
        .replace(' ', '')
        .match(this.state.keyword.toLowerCase().replace(' ', ''))
    );
    return (
      <div className="c-scene-list">
        <SearchBar onKeywordChange={this.handleKeywordChange} />
        <div className="c-list">
          {/* <ReactList
            pageSize={5}
            itemRenderer={this.renderPost}
            length={
              posts.filter(post =>
                post.title.toLowerCase().match(this.state.keyword.toLowerCase())
              ).length
            }
          /> */}
          {posts.map(post => (
            <div key={post.sha} className="c-list__item">
              <Link to={`post/${post.sha}`}>{post.title}</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
