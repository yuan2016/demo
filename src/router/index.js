import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

const login = r => require.ensure([], () => r(require('../components/login/login')), 'login')
const home = r => require.ensure([], () => r(require('../components/home/home')), 'home')
const main = r => require.ensure([], () => r(require('../components/main/main')), 'main')
const cashManage = r => require.ensure([], () => r(require('../components/cashManage/cashManage')), 'cashManage')
const netProduct = r => require.ensure([], () => r(require('../components/netProduct/netProduct')), 'netProduct')
const addProduct = r => require.ensure([], () => r(require('../components/addProduct/addProduct')), 'addProduct')
const addMember = r => require.ensure([], () => r(require('../components/addMember/addMember')), 'addMember')
const visitor = r => require.ensure([], () => r(require('../components/visitor/visitor')), 'visitor')
const adminSet = r => require.ensure([], () => r(require('../components/adminSet/adminSet')), 'adminSet')
const explain = r => require.ensure([], () => r(require('../components/explain/explain')), 'explain')

Vue.use(Router)

export default [{
  path: '/',
  component: App,
  children: [{path: '', redirect: '/login'},
    {path: '/login', component: login},
    {
      path: '/home',
      component: home,
      children: [{path: '', redirect: '/main'}, {
        path: '/main',
        component: main
      }, {
        path: '/cashManage',
        component: cashManage
      }, {
        path: '/netProduct',
        component: netProduct
      }, {
        path: '/addProduct',
        component: addProduct
      }, {
        path: '/addMember',
        component: addMember
      }, {
        path: '/visitor',
        component: visitor
      }, {
        path: '/adminSet',
        component: adminSet
      }, {
        path: '/explain',
        component: explain
      }]
    }]
}]

