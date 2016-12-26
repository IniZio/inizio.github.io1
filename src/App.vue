<template>
  <div id='app'>
    <header class="header">
      <input class="title search-bar" :placeholder="title" v-model="keyword" @keyup.esc="resetSearch" onclick="this.select()">
      <div style="clear: both"></div>
      <router-link to="/" style="font-size: 70%">My Scribbles</router-link>
    </header>
    <transition appear name="fade" out-in><router-view></router-view></transition>
  </div>
</template>

<style lang="sass" src="./style/index.scss"></style>

<script>
import conf from './conf.json'

export default {
  data () {
    return {
      title: conf.blogTitle,
      keyword: this.$route.query.keyword,
      viewCount: 0
    }
  },
  methods: {
    resetSearch: function () {
      this.keyword = ''
      document.getElementsByClassName('search-bar')[0].blur()
    }
  },
  watch: {
    keyword: function () {
      this.$router.push({name: 'list', query: {'keyword': this.keyword}})
    }
  }
}
</script>
