import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index/index.vue')
  },
  {
    path: '/pngImgBorder',
    name: 'pngImgBorder',
    component: () => import('../views/pngImgBorder/index.vue')
  },
]

export default createRouter({
  history: createWebHashHistory(), // 使用 hash 模式。
  routes, // `routes: routes` 的缩写
})
