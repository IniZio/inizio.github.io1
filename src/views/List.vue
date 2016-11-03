<template>
  <section class="list-view">
    <div v-if="!lists" style="text-align:center">loading..</div>
    <ol v-if="lists" class="list">
      <router-link :to="'/post/' + item.sha" tag="li" v-for="item in orderedList.slice(this.limit * this.currentPage, this.limit * (this.currentPage + 1))" class="list-item">
        <div class="item-property">
          <div class="item-property__tag" v-for="tag in item.tags">
          {{tag}}
          </div>
          <time pubdate="pubdate" :datetime="item.date" class="item-property__date">{{ item.date | timeago }}</time>
        </div>
        <router-link :to="'/post/' + item.sha">
          <div class="item-title">{{ item.title }}</div>
        </router-link>
        <div class="item-desc" v-if="item.desc">{{item.desc}}</div>
        <div class="item-desc" v-else v-html="htmlFromMarkdown(item.content)"></div>
        <br>

      </router-link>
    </ol>
    <div><p style="text-align: center"><a class="btn" @click="turnPage(currentPage-1)" ><span><i class="arrow-left icon"></i></span>Previous</a>|<a class="btn" @click="turnPage(currentPage+1)">Next<span><i class="arrow-right icon"></i></span></a></p></div>
  </section>
</template>

<script>
  var md = require('markdown-it')({
    html: true,
    highlight: function (code, lang) {
      // http://prismjs.com/extending.html#api
      return Prism.highlight(code, Prism.languages[lang] || Prism.languages.javascript)
    },
    typography: true,
    linkify: true
  })
  import Prism from 'prismjs'
  import fm from 'front-matter'

  md.use(require('markdown-it-katex'))
  md.use(require('markdown-it-header-sections'))

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
        }).sort((a, b) => (new Date(b.date) - new Date(a.date)))
      }
    },

    created () {
      this.loadList()
    },

    methods: {
      htmlFromMarkdown (content) {
        // return md.render('@[toc](Title)' + this.content)
        return md.render(content)
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
                item.content = content.body
                item.desc = content.attributes.desc
                item.tags = content.attributes.tags
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
