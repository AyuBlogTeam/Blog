const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack(config) {
    config.resolve.alias.set('@', resolve('src')),
      config.resolve.alias.set('Styles', resolve('src/assets/Styles')),
      config.resolve.alias.set('Images', resolve('src/assets/Images')),
      config.resolve.alias.set('Iconfont', resolve('src/assets/Iconfont')),
      config.resolve.alias.set('Common', resolve('src/common')),
      config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  },
  productionSourceMap: false,
  // publicPath: process.env.NODE_ENV == "development"?'/':'./',
  publicPath: '/',
  devServer: {
    proxy: 'http://localhost:8081/'
  },
  configureWebpack: config => {
    const plugins = [];
    plugins.push(
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
        threshold: 10240,
        minRatio: 0.8
      })
    );
    config.externals = {
      IPserver: "IPserver"
    }
    config.plugins = [...config.plugins, ...plugins];
  }
}