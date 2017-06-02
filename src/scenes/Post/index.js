import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { Post } from '../../store'

@observer
export default class PostDetail extends Component {
  props: {
    post?: Post,
    match: Object,
    location: Object,
    history: Object
  };
  static defaultProps = {
    post: new Post({ sha: '' })
  };
  componentDidMount () {
    if (!this.props.post.sha) {
      this.props.post.sha = this.props.match.params['sha']
    }
    this.props.post.fetchDetail().then(() => {
      window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
    })
  }
  render () {
    return (
      <div>
        {this.props.post.body
          ? <div>
              <h1>{this.props.post.title}</h1>
              <article
                dangerouslySetInnerHTML={{ __html: this.props.post.html }}
              />
            </div>
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
    )
  }
}
