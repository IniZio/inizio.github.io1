<template>
  <section class="post-view">
    <div v-if="!content">loading..</div>
    <h1 v-else class="post-title">
      <router-link :to="$route.fullPath">{{ title }}</router-link>
      <time pubdate="pubdate" :datetime="this.date" class="post-date">{{ this.date | timeago }}</time>
    </h1>
    <article v-show="content" v-html="htmlFromMarkdown"></article>
  </section>
</template>

<script>
  import Vue from 'vue'
  import Clipboard from 'clipboard'

  import api from '../api'
  import conf from '../conf.json'

  // import Prism from 'prismjs'
  import Prism from '../vendor/prism.min'
  // import 'prismjs/plugins/line-numbers/prism-line-numbers.min.js'
  var md = require('markdown-it')({
    html: true,
    highlight: function (code, lang) {
      // http://prismjs.com/extending.html#api
      let head = '<pre class="line-numbers '
      let tail = '</pre>'
      if (lang === 'sh') lang = 'bash'
      return head + (lang === 'bash' ? 'command-line ' : '') + (Prism.languages[lang] === undefined ? 'language-javascript' : 'language-' + lang) + '">' +
             '<button class="btn copy-btn" data-clipboard-text="' + code + '">Copy</span></button><div style="clear: both"></div>' +
             Prism.highlight(code, Prism.languages[lang] || Prism.languages.javascript) +
             tail
    },
    typography: true,
    linkify: true
  })
  // import 'prismjs/plugins/line-numbers/prism-line-numbers.min'
  // Prism.highlightAll()
  import fm from 'front-matter'

  md.use(require('markdown-it-katex'))
  md.use(require('markdown-it-header-sections'))
  // md.use(require('markdown-it-toc-and-anchor').default, {
  //   tocClassName: 'table-of-contents',
  //   tocFirstLevel: '2',
  //   anchorLink: true
  // })

  export default {
    name: 'postView',

    data () {
      return {
        title: '',
        date: null,
        content: ''
      }
    },

    computed: {
      htmlFromMarkdown () {
        // return md.render('@[toc](Title)' + this.content)
        return md.render(this.content)
      }
    },

    mounted () {
      this.loadPost()
      // Prism.highlightAll()

      var clipboard = new Clipboard('.copy-btn')

      clipboard.on('success', function (e) {
        e.trigger.innerText = 'Copied!'
        setTimeout(function () { e.trigger.innerText = 'Copy' }, 1500, e)
        e.clearSelection()
      })

      clipboard.on('error', function (e) {
        e.trigger.innerText = 'Copy Failed!'
        setTimeout(function () { e.trigger.innerText = 'Copy' }, 2000, e)
        e.clearSelection()
      })
    },

    methods: {
      loadPost () {
        api.getDetail(this.$route.params.hash)
          .then(text => {
            // Parse front-matter
            // https://github.com/jxson/front-matter#fmstring
            const content = fm(text)
            this.content = content.body
            this.title = content.attributes.title
            this.date = content.attributes.date
            // Set window title
            window.document.title = `${this.title} - ${conf.blogTitle}`
          })
          .catch(() => { /* TODO */ })
      },

      newTab () {
        Vue.nextTick(function () {
          // Load the external link into new tab
          const linksArray = Array.from(document.querySelectorAll('a'))
          const currentHost = window.location.host
          linksArray.forEach(el => {
            if (el.href && el.host !== currentHost) {
              el.target = '_blank'
              // https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
              el.rel = 'noopener noreferrer'
            }
          })
        })
      }
    },

    watch: {
      'htmlFromMarkdown': 'newTab'
    }
  }
</script>
