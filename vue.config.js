const { defineConfig } = require('@vue/cli-service')
// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://ogbs.cankaya.edu.tr',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, 
      },
    },
  },
};