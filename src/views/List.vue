<template>
  <section class="list-view">
    <div v-if="!lists">loading..</div>
    <ol v-if="lists" class="list">
      <li v-for="item in orderedList" class="list-item">
        <router-link :to="'/post/' + item.sha" class="item-title">
          {{ item.title }}
        </router-link>
        <br>
        <time pubdate="pubdate" :datetime="item.date" class="item-date">{{ item.date | timeago }}</time>
      </li>
    </ol>
  </section>
</template>

<script>
  import api from '../api'
  import conf from '../conf.json'

  export default {
    name: 'listView',

    data () {
      return {
        lists: null
      }
    },

    computed: {
      orderedList () {
        var keyword = this.$route.query.keyword
        // Order by publish date, desc
        return this.lists.filter(function (item) {
          return item.title.toLowerCase().indexOf(keyword) !== -1
        }).sort((a, b) => (new Date(b.date) - new Date(a.date)))
      }
    },

    created () {
      this.loadList()
    },

    methods: {
      filteredList () {
        return this.lists.filter(function (row) {
          return String(row.title).toLowerCase().indexOf(this.$route.query.keyword) > -1
        })
      },
      loadList () {
        window.document.title = conf.blogTitle
        api.getList()
          .then(lists => {
            this.lists = lists
          })
          .catch(() => { /* TODO */ })
      },
      containKeyword (item) {
        return item.title.indexOf(this.$route.query.keyword) !== -1
      }
    },

    watch: {
      '$route': 'loadList'
    }

  }
</script>
