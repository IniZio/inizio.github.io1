'use strict'

import Vue from 'vue'

import './utils/filter'

import router from './router'
import App from './App.vue'

// whether to allow vue-devtools inspection
// false in production builds
Vue.config.devtools = process.env.NODE_ENV !== 'production'

const app = new Vue(
  Vue.util.extend({ router }, App)
).$mount('#app')

export { app, router }
