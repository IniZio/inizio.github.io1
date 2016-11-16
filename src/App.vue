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

<style>
@import url('https://fonts.googleapis.com/css?family=Alegreya+Sans+SC:100|Lato:200');
/*@import url('https://fonts.googleapis.com/css?family=Raleway:400');*/

@font-face {
  font-family: tofinoThin;
  src: url('./font/Tofino Thin.ttf');
}
</style>
<style lang="sass" src="./style/index.scss"></style>

<script>
  import Firebase from 'firebase'

  import conf from './conf.json'

  export default {
    data () {
      return {
        title: conf.blogTitle,
        keyword: this.$route.query.keyword,
        viewCount: 0,
      }
    },
    methods: {
      resetSearch: function () {
        this.keyword = ''
        document.getElementsByClassName('search-bar')[0].blur()
      },
      updateViewCount: function() {
        var Database = Firebase.database()
        var pageURL = document.URL.split('.').join('_'),
        pageURL = pageURL.split('/').join('*'),
        pageURL = pageURL.split('#').join('*'),
        domain = window.location.host,
        rootRef = null,
        pagePref='one',
        locPref,
        choice
       
        if(pagePref=='one'){
          // rootRef = Database.ref(pageURL.split('.').join('_'));
          rootRef = Database.ref(pageURL)
        }else{
          rootRef = Database.ref(domain.split('.').join('_'));
          // rootRef = Database.ref(pageURL)
        };

        rootRef.transaction((currentData) => {
          if (currentData === null) {
            var obj = {total: 1 };
            obj[pageURL] = {total: 1};
            return obj;
          } else {        
            if (currentData[pageURL] === null){
              var obj = { total: currentData.total+1 };
              obj[pageURL] = {total: 1};
              return obj
            }else{
              var obj = {total: currentData.total+1 };
              obj[pageURL] = {total: currentData[pageURL].total+1};
              return obj
            };    
          }
        }, (error, committed, snapshot) => {
          if (error) {
            return false;
          } else if (!committed) {
            return false;
          }   
          var choice;
          if(pagePref==='all'){ choice = snapshot.val().total };    
          if(pagePref==='one'){ choice = snapshot.val()[pageURL].total }; 

          this.viewCount = choice
        }); 

      }
    },
		mounted() {
      var config = {
          apiKey: "AIzaSyDYaMu9kzyrF3g915_B9AB5ONHXvOPfdlg",
          authDomain: "counter-650e8.firebaseapp.com",
          databaseURL: "https://counter-650e8.firebaseio.com",
          storageBucket: "counter-650e8.appspot.com",
          messagingSenderId: "705101739547"
      };
      Firebase.initializeApp(config);
      this.updateViewCount() 
		},
    watch: {
      keyword: function () {
        this.$router.push({name: 'list', query: {'keyword': this.keyword}})
      },
      '$route.path': function(newPath) {
        this.updateViewCount()
        //console.log(this.viewCount)
      } 
    }
  }
</script>
