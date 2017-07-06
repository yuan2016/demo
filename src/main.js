// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import './common/stylus/include.styl'
import 'element-ui/lib/theme-default/index.css'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import routes from './router/index'
import {getToken} from './utils/storage'
//import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, Axios)
Vue.use(VueRouter)
//Vue.use(VueResource)

const router = new VueRouter({
  routes
})
const whiteList = ['/login']// 不重定向白名单
router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    next()
  } else {
    if (getToken()) {
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
