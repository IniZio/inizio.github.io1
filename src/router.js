import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import List from './scenes/List'
import Post from './scenes/Post'

export default ({ store }) => {
  const supportsHistory = 'pushState' in window.history
  return (
    <Router basename="/" forceRefresh={!supportsHistory}>
      <Route
        render={({ location, history, match }) => (
          <div className="o-container">
            <div className="c-app-header u-text-center">
              {/* <h1 onClick={() => history.goBack()}>IniZio</h1> */}
              <h1><Link to="/">IniZio</Link></h1>
            </div>
            <Switch key={location.key} location={location}>
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
            </Switch>
          </div>
        )}
      />
    </Router>
  )
}
