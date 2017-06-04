// @flow
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
// import ReactList from 'react-list';

import { PostStore } from '../../store'

import SearchBar from './components/SearchBar'

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
  componentDidMount () {
    this.props.postStore.fetchList()
  }
  handleKeywordChange = (keyword: string) => {
    this.setState({ keyword })
  };
  render () {
    const posts = this.props.postStore.posts.filter(post =>
      post.title
        .toLowerCase()
        .replace(' ', '')
        .match(this.state.keyword.toLowerCase().replace(' ', ''))
    )
    return (
      <div className="c-scene-list">
        <SearchBar onKeywordChange={this.handleKeywordChange} />
        <div className="c-list">
          {posts
            ? posts.map(post => (
                <li key={post.sha} className="c-list__item">
                  <Link to={`post/${post.sha}`}>
                    {post.title}
                  </Link>
                  <br />
                  {/* <span className="c-list__item-date">{post.date}</span> */}
                </li>
              ))
            : <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <p>Loading...</p>
              </div>}
        </div>
      </div>
    )
  }
}
