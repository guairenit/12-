const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', //根路径
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',  //接口服务器地址
        changeOrigin: true,              // 是否开启跨域，true为开启
        pathRewrite: {            // 路径重写
          '^/api': ''        // 替换为‘api’字符串
        }
      },
    }
  }
})
