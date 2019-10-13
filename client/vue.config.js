const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack(config) {
    config.resolve.alias.set('@', resolve('src')),
      config.resolve.alias.set('Styles', resolve('src/assets/Styles')),
      config.resolve.alias.set('Images', resolve('src/assets/Images')),
      config.resolve.alias.set('Iconfont', resolve('src/assets/Iconfont')),
      config.resolve.alias.set('Common', resolve('src/common'))
  },
  publicPath: process.env.NODE_ENV == "development"?'/':'./',
  devServer: {
    proxy: 'http://localhost:8081/'
  },
  configureWebpack: config => {
    config.externals = {
      IPserver: "IPserver"
    }
  }
}