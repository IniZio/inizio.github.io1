<template lang="html">
  {{$route.params.alias}}
  <div v-if="$route.params.alias">
    {{{markdown}}}
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    markdown: function() {
      return require('../pages/' + this.$route.params.alias + '.md')
    }
  },
  ready () {},
  attached () {},
  methods: {},
  components: {}
}
</script>

<style lang="sass">
</style>
