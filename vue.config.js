module.exports = {
  publicPath: "/",
  outputDir: "dist",
  lintOnSave: true,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    port: 9898,
    open: true,
  },
};
