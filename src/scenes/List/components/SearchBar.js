// @flow
import React, { Component } from 'react'
import { setParam } from '../../../util'
import queryString from 'query-string'

export default class SearchBar extends Component {
  state = {
    keyword: queryString.parse(window.location.search)['keyword']
  };
  componentDidMount () {
    document.addEventListener('keydown', (e: any) => {
      if (e.keyCode === 191) {
        // when press '/'
        !!this.searchInput && this.searchInput.focus()
      }
    })
  }
  componentDidUpdate (prevProps: Object, prevState: Object) {
    if (this.state.keyword !== prevState.keyword) {
      this.changeKeyword(this.state.keyword)
    }
  }
  changeKeyword = (keyword: string) => {
    // clear keyword if has '/'
    if (keyword.includes('/')) {
      keyword = ''
      this.clearSearch()
    }
    // update url keyword param if browser supports replacestate
    if (window.history.replaceState) {
      const newUrl = setParam(window.location.href, 'keyword', keyword)
      // prevents browser from storing history with each change:
      window.history.replaceState(keyword, 'IniZio', newUrl)
    }
    this.props.onKeywordChange(keyword)
  };
  clearSearch = () => {
    this.setState({ keyword: '' })
    if (window.history.replaceState) {
      // prevents browser from storing history with each change:
      window.history.replaceState(
        '',
        'IniZio',
        window.location.href.split('?')[0]
      )
    }
    this.props.onKeywordChange('')
  };
  render () {
    return (
      <div className="c-searchbar u-text-center">
        <input
          ref={input => {
            this.searchInput = input
          }}
          className="c-searchbar__input"
          name="keyword"
          placeholder="Type / to start searching"
          value={this.state.keyword}
          onChange={({ target }) => this.setState({ keyword: target.value })}
        />
      </div>
    )
  }
}
