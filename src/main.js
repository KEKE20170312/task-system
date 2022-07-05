/*
 * @Description:
 * @Author: keke
 * @Date: 2022-07-02 12:09:33
 * @LastEditors: keke
 * @LastEditTime: 2022-07-05 14:56:29
 * @FilePath: \task-system\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Message, Spin } from 'view-design'
import 'view-design/dist/styles/iview.css'
import axios from 'axios'
Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000 * 8
})

Vue.prototype.$Message = Message
Vue.prototype.$Spin = Spin
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
