// @flow
import React, { Component } from 'react';

export default class SearchBar extends Component {
  changeKeyword = ({ target }) => {
    this.props.onKeywordChange(target.value);
  };
  handleKeyPress = e => {
    console.log(e.key);
  };
  render() {
    return (
      <div className="c-searchbar u-text-center">
        <input
          className="c-searchbar__input"
          name="keyword"
          placeholder="Type something..."
          onChange={this.changeKeyword}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}
