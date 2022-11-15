const { defineConfig } = require('@vue/cli-service')
const path = require('path');
const port = 8080
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: process.env.NODE_ENV === "production" ? "./" : "/" + "/project/math",
  pwa: {
    iconPaths: {
        favicon32: 'favicon1.ico',
        favicon16: 'favicon1.ico',
        appleTouchIcon: 'favicon1.ico',
        maskIcon: 'favicon1.ico',
        msTileImage: 'favicon1.ico'
    }
}
})
