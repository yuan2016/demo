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
import router from './router'
import { getToken, getEmail } from './common/js/storage'
import './config/height'
import store from './store/'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, Axios)
Vue.use(VueRouter)

// permissiom judge
function hasPermission (roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login']// 不重定向白名单
router.beforeEach((to, from, next) => {
  if (getToken()) { // 判断是否有token
    if (to.path === '/login') {
      next({path: '/main'})
    } else {
      if (store.getters.table.length === 0) {
        store.dispatch('GetInfo', getEmail() + '@xianjinkd.com').then(res => {
          const roles = store.getters.table.split('|')
          store.dispatch('GenerateRoutes', {roles}).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next(to.path) // hack方法 确保addRoutes已完成
          })
        }).catch(err => {
          console.log(err)
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
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
  store: store,
  components: {App}
})
