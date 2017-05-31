// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Store from './store';

import AppRouter from './router';

/**
 * @export
 * @class App
 * @extends {Component}
 */
@observer
export default class App extends Component {
  render() {
    return (
      <div className="o-container">
        <div className="c-app-header u-text-center"><h1>IniZio</h1></div>
        <AppRouter store={Store} />
      </div>
    );
  }
}
