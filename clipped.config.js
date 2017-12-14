const path = require('path')
const presetWebpackFrontend = require('clipped-preset-webpack-frontend')

module.exports = async clipped => {
  await clipped.use(presetWebpackFrontend)

  clipped.config.webpack.resolveLoader.modules
    .add(path.join(__dirname, 'node_modules'))

  clipped.config.webpack.module
    .rule('marko')
      .test(/\.marko$/)
      .include
        .add(clipped.resolve('src'))
        .end()
      .use('marko')
        .loader('marko-loader')

  console.log(clipped.config.webpack.toConfig().module.rules)
}
