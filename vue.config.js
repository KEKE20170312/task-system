/*
 * @Description:
 * @Author: keke
 * @Date: 2022-07-02 12:09:33
 * @LastEditors: keke
 * @LastEditTime: 2022-07-05 15:14:55
 * @FilePath: \task-system\vue.config.js
 */
module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "./src/assets/style/index.scss";`
      }
    }
  }
}
