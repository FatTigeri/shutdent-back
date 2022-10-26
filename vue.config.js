const { defineConfig } = require('@vue/cli-service')
const port = 8080
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: process.env.NODE_ENV === "production" ? "./" : "/" + "root/workspace/math",
})
