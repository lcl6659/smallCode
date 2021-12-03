module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["import", { libraryName: "Antd", libraryDirectory: "es", style: true }], // `style: true` 会加载 less 文件
  ]
}
