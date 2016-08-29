---
title: Create a NPM project from scratch (I)
date: '2016-08-26 08:08:00'
layout: default
---
Uses Npm, Typescript, Angular2, Webpack

# Stuff I not sure about:
- I think npm devdependencies are stuff that are used during developing and compiling the codes, while dependencies are for running the website?


# Npm and typings
Install Nodejs, NPM from official website. [NodeJs](https://nodejs.org/)

Open a new folder, run: `npm init`.

```
.
package.json
```

# Angular2
Install some @angular files:
```sh
$ npm i -S @angular/common @angular/compiler @angular/core @angular/forms @angular/http @angular/platform-browser @angular/platform-browser-dynamic @angular/platform-server @angular/router
```

# Webpack
Install webpack and webpack-dev-server:
```sh
$ npm i -D webpack webpack-dev-server webpack-merge
```
| Loader   | Function|
|:-|:-|
|Webpack| Build tool that treats each file processing as loaders instead of pipes or tasks|
|Webpack-dev-server| a webpack server for hosting the project on localhost to debug|
|Webpack-merge|sometimes you will have multiple webpack configs for different platforms/stages e.g. mobile, electron, develop, production|


## Webpack config files
I separated webpack into two parts: shared parts and platform/stage specific parts. Therefore webpack.config.js is just used to call them according to parameters

#### webpack.config.js:
```js
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
      module.exports = require('./config/webpack.prod');
    break;
    case 'test':
    case 'testing':
        module.exports = require('./config/webpack.test');
      break;
      case 'dev':
      case 'development':
          module.exports = require('./config/webpack.dev');
        break;
  default:
}
```

#### webpack.common.js:
```js
const webpack = require('webpack');
const helpers = require('./helpers');

var autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const METADATA = {
  isDevServer: helpers.isWebpackDevServer()
}

module.exports = {
  metadata: METADATA,

  entry: {
    'vendor': './src/vendor.ts',
    'main': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.ts', '.js', '.json'],
    root: helpers.root('src'),
    modulesDirectories: ['node_modules']
  },

  module: {
    preLoaders: [{
      test: /\.ts$/,
      loader: 'tslint-loader',
      exclude: [helpers.root('node_modules')]
    }],

    loaders: [{
      test: /\.ts$/,
      // loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
      loaders: ['ts-loader', 'angular2-template-loader'],
      exclude: [/\.(spec|e2e)\.ts$/]
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.css$/,
      loaders: ['to-string-loader', 'css-loader', 'postcss-loader']
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ['raw-loader', 'sass-loader', 'postcss-loader']
    }, {
      test: /\.html$/,
      loader: 'raw-loader',
      exclude: [helpers.root('src/index.html')]
    }, {
      test: /\.(jpg|png|gif)$/,
      loader: 'file'
    }],
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),
      new CopyWebpackPlugin([{
        from: 'src/assets',
        to: 'assets'
      }]),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: 'dependency'
      }),
    ]
  },
  postcss: [autoprefixer({
    browsers: ['last 2 versions']
  })]
}

```
