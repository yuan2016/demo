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
const loginCount = r => require.ensure([], () => r(require('../components/loginCount/loginCount')), 'loginCount')
const statistics = r => require.ensure([], () => r(require('../components/statistics/statistics')), 'statistics')
//数据分析
const daysStageStatistics = r => require.ensure([], () => r(require('../components/page/dataAnalysis/21daysStageStatistics/21daysStageStatistics')), '21daysStageStatistics')
const collectionManagement = r => require.ensure([], () => r(require('../components/page/dataAnalysis/collectionManagement/collectionManagement')), 'collectionManagement')
const dailyLendingData = r => require.ensure([], () => r(require('../components/page/dataAnalysis/dailyLendingData/dailyLendingData')), 'dailyLendingData')
const dailyRepaymentAmountData = r => require.ensure([], () => r(require('../components/page/dataAnalysis/dailyRepaymentAmountData/dailyRepaymentAmountData')), 'dailyRepaymentAmountData')
const dailyRepaymentUnitData = r => require.ensure([], () => r(require('../components/page/dataAnalysis/dailyRepaymentUnitData/dailyRepaymentUnitData')), 'dailyRepaymentUnitData')
const fundAnalysis = r => require.ensure([], () => r(require('../components/page/dataAnalysis/fundAnalysis/fundAnalysis')), 'fundAnalysis')
const overdueRepaymentStatistics = r => require.ensure([], () => r(require('../components/page/dataAnalysis/overdueRepaymentStatistics/overdueRepaymentStatistics')), 'overdueRepaymentStatistics')

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
        meta: ['用户信息管理', '客户信息']
      }, {
        path: '/fundProduct',
        component: fundProduct,
        meta: ['用户信息管理', '基金信息']
      }, {
        path: '/customTable',
        component: customTable,
        meta: ['用户信息管理', '自定义表单']
      }, {
        path: '/addProduct',
        component: addProduct,
        meta: ['借款管理', '添加产品']
      }, {
        path: '/addMember',
        component: addMember,
        meta: ['借款管理', '现金成员']
      }, {
        path: '/visitor',
        component: visitor,
        meta: ['还款管理', '用户分布']
      }, {
        path: '/loginCount',
        component: loginCount,
        meta: ['还款管理', '登录数']
      }, {
        path: '/statistics',
        component: statistics,
        meta: ['还款管理', '统计图表']
      }, {
        path: '/dailyLendingData',
        component: dailyLendingData,
        meta: ['数据分析', '每日放款数据']
      }, {
        path: '/dailyRepaymentUnitData',
        component: dailyRepaymentUnitData,
        meta: ['数据分析', '每日还款单位数据']
      }, {
        path: '/daysStageStatistics',
        component: daysStageStatistics,
        meta: ['数据分析', '21天分期统计']
      }, {
        path: '/dailyRepaymentAmountData',
        component: dailyRepaymentAmountData,
        meta: ['数据分析', '每日还款金额数据']
      }, {
        path: '/overdueRepaymentStatistics',
        component: overdueRepaymentStatistics,
        meta: ['数据分析', '还款逾期统计']
      }, {
        path: '/fundAnalysis',
        component: fundAnalysis,
        meta: ['数据分析', '资金分析']
      }, {
        path: '/collectionManagement',
        component: collectionManagement,
        meta: ['数据分析', '催收管理']
      }, {
        path: '/explain',
        component: explain,
        meta: ['推广管理', '产品说明']
      }]
    }]
}]

