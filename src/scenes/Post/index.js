import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { Post } from '../../store';

@observer
export default class PostDetail extends Component {
  props: {
    post?: Post,
    match: Object,
    location: Object,
    history: Object
  };
  componentDidMount () {
    if (!this.props.post) {
      this.props.post = new Post({ sha: this.props.match.params['sha'] });
    }
    console.log(this.props.post);
    this.props.post.fetchDetail().then(() => console.log(this.props.post));
  }
  render () {
    return (
      <div>
        <h1>{this.props.post.title}</h1>
        <article dangerouslySetInnerHTML={{ __html: this.props.post.html }} />
      </div>
    );
  }
}
