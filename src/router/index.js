/*
 * @Description: 
 * @Author: keke
 * @Date: 2022-07-02 12:09:33
 * @LastEditors: keke
 * @LastEditTime: 2022-07-02 12:31:32
 * @FilePath: \task-system\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TaskView',
    component: () => import('@/views/TaskView/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
