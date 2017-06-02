const {
  FuseBox,
  Sparky,
  SVGPlugin,
  CSSPlugin,
  BabelPlugin,
  JSONPlugin,
  UglifyJSPlugin,
  SassPlugin,
  WebIndexPlugin
} = require('fuse-box')
const rimraf = require('rimraf')
const fs = require('fs')
const path = require('path')
const express = require('express')

const isProduction = process.env.NODE_ENV === 'production'
const dist = path.resolve(__dirname, './dist')

/**
 * Fuse options
 */
const fuse = new FuseBox({
  homeDir: 'src/',
  sourceMaps: !isProduction,
  output: 'dist/$name.js',
  log: isProduction,
  hash: isProduction,
  cache: !isProduction,
  plugins: [
    WebIndexPlugin({
      title: 'IniZio',
      template: 'src/tpl.html'
    }),
    [
      SassPlugin(),
      CSSPlugin()
    ],
    CSSPlugin({
      outFile: file => `${dist}/${file}`,
      inject: file => `${file}`
    }),
    BabelPlugin({}),
    JSONPlugin(),
    ...(isProduction
      ? [UglifyJSPlugin({ comments: false, mangle: true, drop_console: true })]
      : [])
  ]
})

/**
 * Task Runners
 */
Sparky.task(
  'remove-dist',
  () =>
    new Promise((resolve, reject) => {
      rimraf('dist/*.js', () =>
        rimraf('dist/*.js.map', () => rimraf('dist/styles/*', () => resolve()))
      )
    })
)

Sparky.task('default', ['dev'], () => {})

Sparky.task('dev', () => {
  // fuse.dev({ port: 8080 });
  fuse.dev({ root: false }, server => {
    const app = server.httpServer.app
    app.use('/', express.static(dist))
    app.get('*', function (req, res) {
      res.sendFile(path.join(dist, 'index.html'))
    })
    app.set('port', 8080)
    app.listen(8080)
  })
  fuse.bundle('app').watch().hmr().instructions('> index.js')
  fuse.run()
})

Sparky.task('build', ['remove-dist'], () => {
  fuse.bundle('vendor').instructions('~ index.js')
  fuse.bundle('app').instructions('!> [index.js]')
  fuse.run()
})
