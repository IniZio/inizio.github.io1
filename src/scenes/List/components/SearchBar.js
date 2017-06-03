// @flow
import React, { Component } from 'react'

export default class SearchBar extends Component {
  componentDidMount () {
    document.addEventListener('keydown', (e: Event) => {
      console.log(e.keyCode)
      if (e.keyCode === 191) {
        this.searchInput.focus()
      } else if (e.keyCode === 27) {
        this.clearSearch()
      }
    })
  }
  changeKeyword = ({ target }: Event) => {
    if (target.value[0] === '/') this.clearSearch()
    this.props.onKeywordChange(target.value)
  };
  clearSearch = () => {
    this.searchInput.value = ''
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
          onChange={this.changeKeyword}
        />
      </div>
    )
  }
}
