import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import List from './scenes/List';
import Post from './scenes/Post';

export default ({ store }) => {
  const supportsHistory = 'pushState' in window.history;
  return (
    <Router basename='/' forceRefresh={!supportsHistory}>
      <div>
        <Route
          exact
          path='/'
          component={() => <List postStore={store.postStore} />}
        />
        <Route
          path='/post/:sha'
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
    </Router>
  );
};
