<template>
  <div id='app'>
    <header class="header">
      <router-link tag="h1" to="/" class="title">{{ title }}</router-link>
    </header>
    <transition appear name="fade" out-in><router-view></router-view></transition>
  </div>
</template>

<!-- <style lang="stylus" src="./style/index.styl"></style> -->
<style>
@import url('https://fonts.googleapis.com/css?family=Alegreya+Sans+SC:100|Lato:100');
@import url('https://fonts.googleapis.com/css?family=Raleway:400');
</style>
<style lang="sass" src="./style/index.scss"></style>

<script>
  import conf from './conf.json'

  export default {
    data () {
      return {
        title: conf.blogTitle
      }
    }
  }
</script>
