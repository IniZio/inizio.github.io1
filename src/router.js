import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import List from './scenes/List'
import Post from './scenes/Post'

export default ({ store }) => {
  const supportsHistory = 'pushState' in window.history
  return (
    <Router basename="/" forceRefresh={!supportsHistory}>
      <div className="o-container">
        <div className="c-app-header u-text-center">
          <h1><Link to="/">IniZio</Link></h1>
        </div>
        <div>
          <Route
            exact
            path="/"
            component={() => <List postStore={store.postStore} />}
          />
          <Route
            path="/post/:sha"
            component={props => (
              <Post
                {...props}
                {...{
                  post: store.postStore.posts.filter(
                    post => post.sha === props.match.params['sha']
                  )[0]
                }}
              />
            )}
          />
        </div>
      </div>
    </Router>
  )
}
