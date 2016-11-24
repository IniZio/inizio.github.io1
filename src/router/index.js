import Vue from 'vue'
import VueRouter from 'vue-router'

import ListView from '../views/List.vue'
import PostView from '../views/Post.vue'
import CVView from '../views/CV.vue'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    name: 'list',
    component: ListView
  },
  {
    path: '/post/:hash',
    name: 'post',
    component: PostView
  },
  {
    path: '/cv',
    name: 'cv',
    component: CVView
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})
