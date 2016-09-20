import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App.vue'
import Post from './components/Post.vue'

// new Vue({
//   el: 'body',
//   components: { App }
// })

// VueRouter
Vue.use(VueRouter)
var router = new VueRouter()
router.map({
  '/post/:alias': {
    component: Post,
  }
})
router.start({ components: { App } }, 'body')
