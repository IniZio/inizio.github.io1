<template>
  <section class="list-view">
    <div v-if="!lists">loading..</div>
    <ol v-if="lists" class="list">
      <router-link :to="'/post/' + item.sha" tag="li" v-for="item in orderedList" class="list-item">
        <router-link :to="'/post/' + item.sha" class="item-title">
          {{ item.title }}
        </router-link>
        <br>
        <time pubdate="pubdate" :datetime="item.date" class="item-date">{{ item.date | timeago }}</time>
      </router-link>
    </ol>
    <div><p style="text-align: center"><a class="btn" @click="turnPage(currentPage-1)" ><span><i class="arrow-left icon"></i></span>Previous</a>|<a class="btn" @click="turnPage(currentPage+1)">Next<span><i class="arrow-right icon"></i></span></a></p></div>
  </section>
</template>

<script>
  import api from '../api'
  import conf from '../conf.json'

  export default {
    name: 'listView',

    data () {
      return {
        lists: null,
        limit: 5,
        currentPage: 0
      }
    },

    computed: {
      totalPage () { return this.lists.length / this.limit },
      orderedList () {
        var keyword = this.$route.query.keyword || ''
        // Filter by title, Order by publish date, desc, Pagination
        return this.lists.filter(function (item) {
          return item.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        }).sort((a, b) => (new Date(b.date) - new Date(a.date))).slice(this.limit * this.currentPage, this.limit * (this.currentPage + 1))
      }
    },

    created () {
      this.loadList()
    },

    methods: {
      turnPage (destPage) {
        if (destPage >= 0 && destPage < this.totalPage) {
          this.currentPage = destPage
        }
      },
      loadList () {
        window.document.title = conf.blogTitle
        api.getList()
          .then(lists => {
            this.lists = lists
          })
          .catch(() => { /* TODO */ })
      }
    },

    watch: {
      '$route': 'loadList'
    }

  }
</script>
