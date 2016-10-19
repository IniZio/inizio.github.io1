<template>
  <div id='app'>
    <header class="header">
      <input class="title search-bar" :placeholder="title" v-model="keyword" @keyup.esc="resetSearch" onclick="this.select()">
      <div style="clear: both"></div>
      <a href="https://www.github.com/inizio" style="font-size: 70%">A Web Coder</a>
    </header>
    <transition appear name="fade" out-in><router-view></router-view></transition>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Alegreya+Sans+SC:100|Lato:200');
@import url('https://fonts.googleapis.com/css?family=Raleway:400');
</style>
<style lang="sass" src="./style/index.scss"></style>

<script>
  import conf from './conf.json'

  export default {
    data () {
      return {
        title: conf.blogTitle,
        keyword: this.$route.query.keyword
      }
    },
    methods: {
      resetSearch: function () {
        this.keyword = ''
        document.getElementsByClassName('search-bar')[0].blur()
      }
    },
    watch: {
      'keyword': function () {
        this.$router.push({name: 'list', query: {'keyword': this.keyword}})
      }
    }
  }
</script>
