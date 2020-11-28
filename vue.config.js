module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
	}
}
