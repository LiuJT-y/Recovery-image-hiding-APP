module.exports = {
  devServer: {
    proxy: {
      '/upload': {
        target: 'http://192.168.65.230:5000', // 后端 Flask 地址
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/upload': '' // 去除路径前缀
        }
      }
    }
  }
};

