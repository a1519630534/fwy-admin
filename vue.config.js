const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3007/api',// 要跨域的域名
        changeOrigin: true, // 是否开启跨域
      //   pathRewrite: {   //重写路径
      //     '^/api': ''
      // }
    }}
  }
})
