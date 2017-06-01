// @flow
import React, { Component } from 'react'
import { observer } from 'mobx-react'

import Store from './store'

import AppRouter from './router'

/**
 * @export
 * @class App
 * @extends {Component}
 */
@observer
export default class App extends Component {
  render () {
    return <AppRouter store={Store} />
  }
}
