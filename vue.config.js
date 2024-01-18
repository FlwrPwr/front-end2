module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://localhost:44313',
        changeOrigin: true,
      },
    },
  },
};
