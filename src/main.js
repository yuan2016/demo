// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import './common/stylus/include.styl'
import 'element-ui/lib/theme-default/index.css'
import Axios from 'axios'
import routes from './router/index'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Axios)
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
