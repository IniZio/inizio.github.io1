<template>
  <section>
    <div v-if="!lists" style="text-align:center">loading...</div>
    <div v-if="lists" class="masonry">
      <router-link :to="'/post/' + item.sha"  v-for="item in orderedList" tag="div" class="item list-item">
        <div class="item-property">
          <router-link :to="'/?keyword=%23'+tag" class="item-property__tag" v-for="tag in item.tags">
          {{tag}}
          </router-link>
          <time pubdate="pubdate" :datetime="item.date" class="item-property__date">{{ item.date | timeago }}</time>
        </div>
        <router-link :to="'/post/' + item.sha">
          <div class="item-title">{{ item.title }}</div>
        </router-link>
        <div class="item-desc">{{item.desc}}</div>
        <br>
      </router-link>
    </div>
  </section>
</template>

<script>
  import fm from 'front-matter'

  import api from '../api'
  import conf from '../conf.json'

  export default {
    name: 'listView',

    data () {
      return {
        lists: null,
        limit: 5,
        currentPage: 0,
        tagList: new Set()
      }
    },

    computed: {
      totalPage () { return this.lists.length / this.limit },
      orderedList () {
        var keyword = this.$route.query.keyword || ''
        // Filter by title, Order by publish date, desc, Pagination
        return this.lists.filter(function (item) {
          if (keyword[0] !== '#') {
            return item.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
          } else {
            return item.tags.find((element) => element.indexOf(keyword.substring(1).toLowerCase()) !== -1)
          }
        }).sort((a, b) => (new Date(b.date) - new Date(a.date)))
      }
    },

    mounted () {
      this.loadList()
    },

    methods: {
      // htmlFromMarkdown (content) {
      //   return md.render(content)
      // },
      refresh () {
        for (let tag of this.tagList) console.log(tag)
      },
      turnPage (destPage) {
        if (destPage >= 0 && destPage < this.totalPage) {
          this.currentPage = destPage
        }
      },
      loadList () {
        window.document.title = conf.blogTitle
        api.getList()
          .then(lists => {
            lists.forEach(function (item) {
              api.getDetail(item.sha).then(text => {
                const content = fm(text)
                // item.content = content.body
                item.desc = content.attributes.desc || 'Click to view'
                item.tags = content.attributes.tags
                for (let tag of item.tags) this.tagList.add(tag)
                // this.title = content.attributes.title
                item.date = content.attributes.date || item.date
              })
            })
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
