import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import List from './components/List';

export default () => (
  <Router>
    <Route exact path='/' component={List} />
    {/* <Route path='/post' component={Post} /> */}
  </Router>
);
