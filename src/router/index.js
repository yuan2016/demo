import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

const login = r => require.ensure([], () => r(require('../components/login/login')), 'login')
const home = r => require.ensure([], () => r(require('../components/home/home')), 'home')
const main = r => require.ensure([], () => r(require('../components/main/main')), 'main')
const cashManage = r => require.ensure([], () => r(require('../components/cashManage/cashManage')), 'cashManage')
const fundProduct = r => require.ensure([], () => r(require('../components/fundProduct/fundProduct')), 'fundProduct')
const addProduct = r => require.ensure([], () => r(require('../components/addProduct/addProduct')), 'addProduct')
const addMember = r => require.ensure([], () => r(require('../components/addMember/addMember')), 'addMember')
const visitor = r => require.ensure([], () => r(require('../components/visitor/visitor')), 'visitor')
const adminSet = r => require.ensure([], () => r(require('../components/adminSet/adminSet')), 'adminSet')
const explain = r => require.ensure([], () => r(require('../components/explain/explain')), 'explain')
const customTable = r => require.ensure([], () => r(require('../components/customTable/customTable')), 'customTable')

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
        component: main,
        meta: []
      }, {
        path: '/cashManage',
        component: cashManage,
        meta: ['数据管理', '客户信息']
      }, {
        path: '/fundProduct',
        component: fundProduct,
        meta: ['数据管理', '基金信息']
      }, {
        path: '/customTable',
        component: customTable,
        meta: ['数据管理', '自定义表单']
      }, {
        path: '/addProduct',
        component: addProduct,
        meta: ['添加数据', '添加产品']
      }, {
        path: '/addMember',
        component: addMember,
        meta: ['添加数据', '现金成员']
      }, {
        path: '/visitor',
        component: visitor,
        meta: ['图标', '用户分布']
      }, {
        path: '/adminSet',
        component: adminSet,
        meta: ['设置', '管理员设置']
      }, {
        path: '/explain',
        component: explain,
        meta: ['说明', '产品说明']
      }]
    }]
}]

