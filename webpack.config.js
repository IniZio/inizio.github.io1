var path = require('path')
var webpack = require('webpack')
var hljs = require('highlight.js')
var jsonfile = require('jsonfile')
var yaml = require('yaml')
var createFile = require('create-file');

var pagesPath = './src/pages/pages.json'
jsonfile.writeFileSync(pagesPath, {})

function IsJsonString(jsonString) {
  try {
    var o = JSON.parse(jsonString);
    if (o && typeof o === "object") {
      return true;
    }
  } catch (e) {}
  return false;
}

function updatePagesJson(addJson) {
  var oldJson = []
  var newJson = []
  createFile(pagesPath, "[]\n", function(err) {
    oldJson = jsonfile.readFileSync(pagesPath)
      // merge newJson and oldJson
    newJson.push.apply(newJson, oldJson)
    newJson.push.apply(newJson, addJson)

    // TODO make all files presented by json is present, delete if not
    jsonfile.spaces = 2
    jsonfile.writeFileSync(pagesPath, newJson)
  })
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [{
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.md$/,
        loader: 'vue-html!markdown-it'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map',
  vue: {
    scss: 'style!css!sass'
  },
  'markdown-it': {
    html: true,
    preset: 'default',
    typographer: true,
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>';
        } catch (__) {}
      }
      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    },
    use: [require('markdown-it-katex'), [require('markdown-it-front-matter'), function(fm) {
      // add front matter to pages.json
      var existJson = IsJsonString(fm) ? fm : yaml.eval('---\n' + fm + '---\n');
      updatePagesJson([existJson])
    }]],
  },
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
