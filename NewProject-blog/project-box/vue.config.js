const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let isProduction = process.env.NODE_ENV;

module.exports = {
  devServer: {
    compress: false,
    host:'localhost',
    open: true,
    proxy: {
      '/api': {
        //代理的具体地址
        target: 'http://localhost:3000',
        //是否允许跨域
        changeOrigin: true,
        //ws 重写
        pathRewite: {
          '/api': '/'
        }
      }
    }
  },
  configureWebpack: config => {
    //生产环境相关配置
    if (isProduction == "production") {
      // 代码压缩
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            //生产环境自动删除console
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
    }
  }
}
