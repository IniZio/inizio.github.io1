<template>
  <div id='app'>
    <div class="row" style="margin: 0">
      <header class="header col-xs-3">
        <div class="title" style="line-height: 1" 
          @mouseenter="title = 'Know Me'"
          @mouseout="title = blogTitle">{{title}}</div>
        <div style="color: grey; font-size: 80%">er... Hello?</div>
        <div style="clear: both"></div>
        <ul class="page-list">
          <li><router-link to="/" style="">Home</router-link></li>
          <li>
            <input class="search-bar" 
                placeholder="Search "
                v-model="keyword"
                @keyup.esc="resetSearch"
                onclick="this.select()">
          </li>
        </ul>
      </header>
      <div class="col-xs-9"><transition appear name="fade" out-in><router-view></router-view></transition></div>
    </div>
  </div>
</template>
<style lang="sass" src="./style/index.scss"></style>
<script>
import conf from './conf.json'

export default {
  data () {
    return {
      blogTitle: conf.blogTitle,
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
    keyword: function () {
      this.$router.push({name: 'list', query: {'keyword': this.keyword}})
    }
  }
}
</script>
