import Vue from 'vue'
import Router from 'vue-router'

const Layout = r => require.ensure([], () => r(require('../components/page/layout/layout')), 'layout')
const login = r => require.ensure([], () => r(require('../components/page/login/login')), 'login')
const home = r => require.ensure([], () => r(require('../components/home/home')), 'home')
const main = r => require.ensure([], () => r(require('../components/page/main/main')), 'main')
const passwordModify = r => require.ensure([], () => r(require('../components/others/passwordModify/passwordModify')), 'passwordModify')
const error = r => require.ensure([], () => r(require('../components/page/404/404')), '404')
//用户信息管理
const userList = r => require.ensure([], () => r(require('../components/page/userInformationManagement/userList/userList')), 'userList')
const userAddressBook = r => require.ensure([], () => r(require('../components/page/userInformationManagement/userAddressBook/userAddressBook')), 'userAddressBook')
const bankCardsList = r => require.ensure([], () => r(require('../components/page/userInformationManagement/bankCardsList/bankCardsList')), 'bankCardsList')
const userNameAuthenticationList = r => require.ensure([], () => r(require('../components/page/userInformationManagement/userNameAuthenticationList/userNameAuthenticationList')), 'userNameAuthenticationList')
const userAuthenticationList = r => require.ensure([], () => r(require('../components/page/userInformationManagement/userAuthenticationList/userAuthenticationList')), 'userAuthenticationList')
//RMAB
const rmabLayout = r => require.ensure([], () => r(require('../components/page/RMAB')), 'rmabLayout')
const loanThroughRate = r => require.ensure([], () => r(require('../components/page/RMAB/market/loanThroughRate/loanThroughRate')), 'loanThroughRate')
const loanThroughRateAll = r => require.ensure([], () => r(require('../components/page/RMAB/market/loanThroughRate/loanThroughRateAll')), 'loanThroughRateAll')
const loanOverdueRecallRate = r => require.ensure([], () => r(require('../components/page/RMAB/collection/loanOverdueRecallRate/loanOverdueRecallRate')), 'loanOverdueRecallRate')
const userBasePortrait = r => require.ensure([], () => r(require('../components/page/RMAB/userPortrait/userBasePortrait/userBasePortrait')), 'userBasePortrait')
const invitationEvent = r => require.ensure([], () => r(require('../components/page/RMAB/operate/invitationEvent/invitationEvent')), 'invitationEvent')
const PVUV = r => require.ensure([], () => r(require('../components/page/promotionManagement/PVUV/PVUV')), 'PVUV')
//借款管理
const assetInformation = r => require.ensure([], () => r(require('../components/page/loanManagement/assetInformation/assetInformation')), 'assetInformation')
const loanApplicationsList = r => require.ensure([], () => r(require('../components/page/loanManagement/loanApplicationsList/loanApplicationsList')), 'loanApplicationsList')
const loanAuditList = r => require.ensure([], () => r(require('../components/page/loanManagement/loanAuditList/loanAuditList')), 'loanAuditList')
const raiseQuotaRecord = r => require.ensure([], () => r(require('../components/page/loanManagement/raiseQuotaRecord/raiseQuotaRecord')), 'raiseQuotaRecord')
const reconciliationFunction = r => require.ensure([], () => r(require('../components/page/loanManagement/reconciliationFunction/reconciliationFunction')), 'reconciliationFunction')
//还款管理
//还款列表
const waitingForReturnList = r => require.ensure([], () => r(require('../components/page/repaymentManagement/repaymentList/waitingForReturnList/waitingForReturnList')), 'waitingForReturnList')
const returnedList = r => require.ensure([], () => r(require('../components/page/repaymentManagement/repaymentList/returnedList/returnedList')), 'returnedList')
//对账列表
const repaymentReconciliation = r => require.ensure([], () => r(require('../components/page/repaymentManagement/reconciliationList/repaymentReconciliation/repaymentReconciliation')), 'repaymentReconciliation')
const renewalReconciliation = r => require.ensure([], () => r(require('../components/page/repaymentManagement/reconciliationList/renewalReconciliation/renewalReconciliation')), 'renewalReconciliation')
//退款列表
const repaymentDetails = r => require.ensure([], () => r(require('../components/page/repaymentManagement/refundList/repaymentDetails/repaymentDetails')), 'repaymentDetails')
const renewalParticulars = r => require.ensure([], () => r(require('../components/page/repaymentManagement/refundList/renewalParticulars/renewalParticulars')), 'renewalParticulars')
const rebackedList = r => require.ensure([], () => r(require('../components/page/repaymentManagement/refundList/rebackedList/rebackedList')), 'rebackedList')
//续期管理
const renewalsList = r => require.ensure([], () => r(require('../components/page/repaymentManagement/renewalManagement/renewalsList/renewalsList')), 'renewalsList')

//数据分析
const daysStageStatistics = r => require.ensure([], () => r(require('../components/page/dataAnalysis/financialData/21daysStageStatistics/21daysStageStatistics')), '21daysStageStatistics')
const daysStageStatistics90 = r => require.ensure([], () => r(require('../components/page/dataAnalysis/financialData/90daysStageStatistics/90daysStageStatistics')), '90daysStageStatistics')
const installmentPromotionStatistics = r => require.ensure([], () => r(require('../components/page/dataAnalysis/financialData/21installmentPromotionStatistics/21installmentPromotionStatistics')), '21installmentPromotionStatistics')
const collectionManagement = r => require.ensure([], () => r(require('../components/page/dataAnalysis/financialData/collectionManagement/collectionManagement')), 'collectionManagement')
const dailyLendingData = r => require.ensure([], () => r(require('../components/page/dataAnalysis/financialData/dailyLendingData/dailyLendingData')), 'dailyLendingData')
const dailyRepaymentAmountData = r => require.ensure([], () => r(require('../components/page/dataAnalysis/financialData/dailyRepaymentAmountData/dailyRepaymentAmountData')), 'dailyRepaymentAmountData')
const dailyRepaymentUnitData = r => require.ensure([], () => r(require('../components/page/dataAnalysis/financialData/dailyRepaymentUnitData/dailyRepaymentUnitData')), 'dailyRepaymentUnitData')
const fundAnalysis = r => require.ensure([], () => r(require('../components/page/dataAnalysis/financialData/fundAnalysis/fundAnalysis')), 'fundAnalysis')
const fundAnalysisProduct = r => require.ensure([], () => r(require('../components/page/dataAnalysis/financialData/fundAnalysisProduct/fundAnalysisProduct')), 'fundAnalysisProduct')
const overdueRepaymentStatistics = r => require.ensure([], () => r(require('../components/page/dataAnalysis/financialData/overdueRepaymentStatistics/overdueRepaymentStatistics')), 'overdueRepaymentStatistics')
const platformData = r => require.ensure([], () => r(require('../components/page/dataAnalysis/dataReport/platformData/platformData.vue')), 'platformData')
const promptAmount = r => require.ensure([], () => r(require('../components/page/dataAnalysis/financialData/promptAmount/promptAmount')), 'promptAmount')

//财务分析
const repaymentMinutia = r => require.ensure([], () => r(require('../components/page/financeAnalysis/repaymentMinutia/repaymentMinutia')), 'repaymentMinutia')
const reconciliationAnalysis = r => require.ensure([], () => r(require('../components/page/financeAnalysis/reconciliationAnalysis/reconciliationAnalysis')), 'reconciliationAnalysis')
const reportStatistics = r => require.ensure([], () => r(require('../components/page/financeAnalysis/reportStatistics/reportStatistics')), 'reportStatistics')
//推广管理
const promotionChannel = r => require.ensure([], () => r(require('../components/page/promotionManagement/promotionChannel/promotionChannel')), 'promotionChannel')
const promoterManagement = r => require.ensure([], () => r(require('../components/page/promotionManagement/promoterManagement/promoterManagement')), 'promoterManagement')
const promotionChannelStatistics = r => require.ensure([], () => r(require('../components/page/promotionManagement/promotionChannelStatistics/promotionChannelStatistics')), 'promotionChannelStatistics')
const promotionRegionStatistics = r => require.ensure([], () => r(require('../components/page/promotionManagement/promotionRegionStatistics/promotionRegionStatistics')), 'promotionRegionStatistics')
const channelStatisticsSummary = r => require.ensure([], () => r(require('../components/page/promotionManagement/channelStatisticsSummary/channelStatisticsSummary')), 'channelStatisticsSummary')
const registrationStatisticsReport = r => require.ensure([], () => r(require('../components/page/promotionManagement/registrationStatisticsReport/registrationStatisticsReport')), 'registrationStatisticsReport')
//权限管理
const employeeList = r => require.ensure([], () => r(require('../components/page/privilegeManage/employeeList/employeeList')), 'employeeList')
Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if hidden:true will not show in the sidebar
 * redirect : if redirect:noredirect will not redirct in the levelbar
 * noDropdown : if noDropdown:true will not has submenu
 * attr : { role: ['admin'] }  will control the page role
 **/

export const constantRouterMap = [
  {path: '/', redirect: '/main', hidden: true},
  {path: '/login', component: login, hidden: true},
  {path: '/passwordModify', component: passwordModify, hidden: true, meta: ['修改密码']},
  {path: '/404', component: error, hidden: true},
  {
    path: '/main',
    component: Layout,
    noDropdown: true,
    redirect: '/main/index',
    icon: 'elextra-icon-home',
    children: [{path: 'index', component: main, name: '首页'}]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/RMAB',
    component: Layout,
    redirect: '/RMAB/market',
    name: 'RMAB',
    icon: 'elextra-icon-analysis',
    children: [
      {
        path: '/RMAB/market',
        icon: 'elextra-icon-item',
        component: rmabLayout,
        redirect: '/RMAB/market/loanThroughRate',
        name: '市场',
        children: [{
          path: 'loanThroughRate',
          icon: 'el-icon-star-on',
          component: loanThroughRate,
          name: '新用户借款通过率',
          meta: ['RMAB', '借款通过率'],
          attr: {role: ['admin']}
        }, {
          path: 'loanThroughRateAll',
          icon: 'el-icon-star-on',
          component: loanThroughRateAll,
          hidden: true,
          name: '新用户借款通过率',
          meta: ['RMAB', '借款通过率'],
          attr: {role: ['admin', 'boss']}
        }]
      },
      {
        path: '/RMAB/operate',
        redirect: '/RMAB/operate/invitationEvent',
        icon: 'elextra-icon-item',
        component: rmabLayout,
        name: '运营',
        children: [{
          path: 'invitationEvent',
          icon: 'el-icon-star-on',
          component: invitationEvent,
          name: '邀请活动',
          meta: ['RMAB', '邀请活动'],
          attr: {role: ['admin', 'boss']}
        }]
      },
      // {
      //   path: '/RMAB/riskManagement',
      //   icon: 'elextra-icon-item',
      //   component: Layout,
      //   name: '风控',
      //   children: [{
      //     path: 'userBasePortrait', icon: 'el-icon-star-on', component: userBasePortrait, name: '新用户借款通过率11'
      //   }]
      // },
      {
        path: '/RMAB/collection',
        redirect: '/RMAB/collection/loanOverdueRecallRate',
        icon: 'elextra-icon-item',
        component: rmabLayout,
        name: '催收',
        children: [{
          path: 'loanOverdueRecallRate',
          icon: 'el-icon-star-on',
          component: loanOverdueRecallRate,
          name: '借款逾期催回率',
          meta: ['RMAB', '借款逾期催回率'],
          attr: {role: ['admin', 'boss']}
        }]
      },
      {
        path: '/RMAB/userPortrait',
        redirect: '/RMAB/userPortrait/userBasePortrait',
        icon: 'elextra-icon-item',
        component: rmabLayout,
        name: '用户画像',
        children: [{
          path: 'userBasePortrait',
          icon: 'el-icon-star-on',
          component: userBasePortrait,
          name: '基础用户画像',
          meta: ['RMAB', '基础用户画像'],
          attr: {role: ['admin', 'boss']}
        }]
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userList',
    name: '用户信息管理',
    icon: 'elextra-icon-user',
    children: [
      {
        path: 'userList',
        component: userList,
        icon: 'el-icon-star-on',
        name: '用户列表',
        meta: ['用户信息管理', '用户列表'],
        attr: {role: ['boss']}
      },
      {
        path: 'userAddressBook',
        component: userAddressBook,
        icon: 'el-icon-star-on',
        name: '用户通讯录',
        meta: ['用户信息管理', '用户通讯录'],
        attr: {role: ['boss']}
      },
      {
        path: 'bankCardsList',
        component: bankCardsList,
        name: '银行卡列表',
        icon: 'el-icon-star-on',
        meta: ['用户信息管理', '银行卡列表'],
        attr: {role: ['finance', 'boss']}
      },
      {
        path: 'userNameAuthenticationList',
        component: userNameAuthenticationList,
        icon: 'el-icon-star-on',
        name: '用户实名认证列表',
        meta: ['用户信息管理', '用户实名认证列表'],
        attr: {role: ['boss']}
      },
      {
        path: 'userAuthenticationList',
        component: userAuthenticationList,
        icon: 'el-icon-star-on',
        name: '用户认证列表',
        meta: ['用户信息管理', '用户认证列表'],
        attr: {role: ['boss']}
      }
    ]
  },
  {
    path: '/loanManagement',
    component: Layout,
    redirect: '/loanManagement/loanApplicationsList',
    name: '借款管理',
    icon: 'elextra-icon-loan',
    children: [
      {
        path: 'loanApplicationsList',
        component: loanApplicationsList,
        icon: 'el-icon-star-on',
        name: '借款申请列表',
        meta: ['借款管理', '借款申请列表'],
        attr: {role: ['boss']}
      },
      {
        path: 'loanAuditList',
        component: loanAuditList,
        icon: 'el-icon-star-on',
        name: '放款审核列表',
        meta: ['借款管理', '放款审核列表'],
        attr: {role: ['boss']}
      },
      {
        path: 'raiseQuotaRecord',
        component: raiseQuotaRecord,
        name: '提额记录表',
        icon: 'el-icon-star-on',
        meta: ['借款管理', '提额记录表'],
        attr: {role: ['finance', 'boss']}
      },
      {
        path: 'reconciliationFunction',
        component: reconciliationFunction,
        icon: 'el-icon-star-on',
        name: '对账功能',
        meta: ['借款管理', '对账功能'],
        attr: {role: ['boss']}
      },
      {
        path: 'assetInformation',
        component: assetInformation,
        icon: 'el-icon-star-on',
        name: '资产信息-招财猫',
        meta: ['借款管理', '资产信息-招财猫'],
        attr: {role: ['boss']}
      }
    ]
  },
  {
    path: '/repaymentManagement',
    component: Layout,
    redirect: '/repaymentManagement/repaymentList',
    name: '还款管理',
    icon: 'elextra-icon-repay',
    children: [
      {
        path: '/repaymentManagement/repaymentList',
        redirect: '/repaymentManagement/repaymentList/waitingForReturnList',
        icon: 'elextra-icon-item',
        component: rmabLayout,
        name: '还款列表',
        children: [{
          path: 'waitingForReturnList',
          icon: 'el-icon-star-on',
          component: waitingForReturnList,
          name: '待还列表',
          meta: ['还款管理', '还款列表', '待还列表'],
          attr: {role: ['admin', 'boss']}
        }, {
          path: 'returnedList',
          icon: 'el-icon-star-on',
          component: returnedList,
          name: '已还列表',
          meta: ['还款管理', '还款列表', '已还列表'],
          attr: {role: ['admin', 'boss']}
        }]
      },
      {
        path: '/repaymentManagement/reconciliationList',
        redirect: '/repaymentManagement/reconciliationList/repaymentReconciliation',
        icon: 'elextra-icon-item',
        component: rmabLayout,
        name: '对账列表',
        children: [{
          path: 'repaymentReconciliation',
          icon: 'el-icon-star-on',
          component: repaymentReconciliation,
          name: '还款对账',
          meta: ['还款管理', '对账列表', '还款对账'],
          attr: {role: ['admin', 'boss']}
        }, {
          path: 'renewalReconciliation',
          icon: 'el-icon-star-on',
          component: renewalReconciliation,
          name: '续期对账',
          meta: ['还款管理', '对账列表', '续期对账'],
          attr: {role: ['admin', 'boss']}
        }]
      },
      {
        path: '/repaymentManagement/refundList',
        redirect: '/repaymentManagement/refundList/repaymentDetails',
        icon: 'elextra-icon-item',
        component: rmabLayout,
        name: '退款列表',
        children: [{
          path: 'repaymentDetails',
          icon: 'el-icon-star-on',
          component: repaymentDetails,
          name: '还款详情',
          meta: ['还款管理', '退款列表', '还款详情'],
          attr: {role: ['admin', 'boss']}
        }, {
          path: 'renewalParticulars',
          icon: 'el-icon-star-on',
          component: renewalParticulars,
          name: '续期详情',
          meta: ['还款管理', '退款列表', '续期详情'],
          attr: {role: ['admin', 'boss']}
        }, {
          path: 'rebackedList',
          icon: 'el-icon-star-on',
          component: rebackedList,
          name: '已退列表',
          meta: ['还款管理', '退款列表', '已退列表'],
          attr: {role: ['admin', 'boss']}
        }]
      },
      {
        path: '/repaymentManagement/renewalManagement',
        redirect: '/repaymentManagement/renewalManagement/repaymentDetails',
        icon: 'elextra-icon-item',
        component: rmabLayout,
        name: '续期管理',
        children: [{
          path: 'renewalsList',
          icon: 'el-icon-star-on',
          component: renewalsList,
          name: '续期列表',
          meta: ['还款管理', '续期管理', '续期列表'],
          attr: {role: ['admin', 'boss']}
        }]
      }
    ]
  }, {
    path: '/dataAnalysis',
    component: Layout,
    redirect: '/dataAnalysis/financialData',
    name: '数据分析',
    icon: 'elextra-icon-data',
    children: [
      {
        path: '/dataAnalysis/financialData',
        redirect: '/dataAnalysis/financialData/dailyLendingData',
        icon: 'elextra-icon-item',
        component: rmabLayout,
        name: '财务数据',
        children: [{
          path: 'dailyLendingData',
          icon: 'el-icon-star-on',
          component: dailyLendingData,
          name: '每日放款数据',
          meta: ['数据分析', '每日放款数据'],
          attr: {role: ['admin', 'boss']}
        }, {
          path: 'dailyRepaymentUnitData',
          icon: 'el-icon-star-on',
          component: dailyRepaymentUnitData,
          name: '每日还款单位数据',
          meta: ['数据分析', '财务数据', '每日还款单位数据'],
          attr: {role: ['admin', 'boss']}
        }, {
          path: 'daysStageStatistics',
          icon: 'el-icon-star-on',
          component: daysStageStatistics,
          name: '21天分期统计',
          meta: ['数据分析', '财务数据', '21天分期统计'],
          attr: {role: ['admin', 'boss']}
        }, {
          path: 'installmentPromotionStatistics',
          icon: 'el-icon-star-on',
          component: installmentPromotionStatistics,
          name: '21天分期提额统计',
          meta: ['数据分析', '财务数据', '21天分期提额统计'],
          attr: {role: ['admin', 'boss']}
        }, {
          path: 'daysStageStatistics90',
          icon: 'el-icon-star-on',
          component: daysStageStatistics90,
          name: '90天分期统计',
          meta: ['数据分析', '财务数据', '90天分期统计'],
          attr: {role: ['admin', 'boss']}
        }, {
          path: 'dailyRepaymentAmountData',
          icon: 'el-icon-star-on',
          component: dailyRepaymentAmountData,
          name: '每日还款金额数据',
          meta: ['数据分析', '财务数据', '每日还款金额数据'],
          attr: {role: ['admin', 'boss']}
        }, {
          path: 'overdueRepaymentStatistics',
          icon: 'el-icon-star-on',
          component: overdueRepaymentStatistics,
          name: '还款逾期统计',
          meta: ['数据分析', '财务数据', '还款逾期统计'],
          attr: {role: ['admin', 'boss']}
        }, {
          path: 'fundAnalysis',
          icon: 'el-icon-star-on',
          component: fundAnalysis,
          name: '资金分析',
          meta: ['数据分析', '财务数据', '资金分析'],
          attr: {role: ['admin', 'boss']}
        }, {
          path: 'fundAnalysisProduct',
          icon: 'el-icon-star-on',
          component: fundAnalysisProduct,
          name: '资金分析(分产品)',
          meta: ['数据分析', '财务数据', '资金分析(分产品)'],
          attr: {role: ['admin', 'boss']}
        }, {
          path: 'collectionManagement',
          icon: 'el-icon-star-on',
          component: collectionManagement,
          name: '催收管理',
          meta: ['数据分析', '财务数据', '催收管理'],
          attr: {role: ['admin', 'boss']}
        }, {
          path: 'promptAmount',
          icon: 'el-icon-star-on',
          component: promptAmount,
          name: '在催金额',
          meta: ['数据分析', '财务数据', '在催金额'],
          attr: {role: ['admin', 'boss']}
        }]
      },
      {
        path: '/dataReport/platformData',
        redirect: '/dataAnalysis/dataReport/platformData',
        icon: 'elextra-icon-item',
        component: rmabLayout,
        name: '数据报表',
        children: [{
          path: 'platformData',
          icon: 'el-icon-star-on',
          component: platformData,
          name: '平台数据',
          meta: ['数据分析', '数据报表', '平台数据'],
          attr: {role: ['admin', 'boss']}
        }]
      }
    ]
  }, {
    path: '/financeAnalysis',
    component: Layout,
    redirect: '/financeAnalysis/repaymentMinutia',
    name: '财务分析',
    icon: 'elextra-icon-finance',
    children: [
      {
        path: 'repaymentMinutia',
        component: repaymentMinutia,
        icon: 'el-icon-star-on',
        name: '还款明细',
        meta: ['财务分析', '还款明细'],
        attr: {role: ['boss']}
      },
      {
        path: 'reconciliationAnalysis',
        component: reconciliationAnalysis,
        icon: 'el-icon-star-on',
        name: '对账分析',
        meta: ['财务分析', '对账分析'],
        attr: {role: ['boss']}
      },
      {
        path: 'reportStatistics',
        component: reportStatistics,
        name: '还款日报',
        icon: 'el-icon-star-on',
        attr: {role: ['finance', 'boss']},
        meta: ['财务分析', '还款日报']
      }
    ]
  },
  {
    path: '/promotionManagement',
    component: Layout,
    redirect: '/promotionManagement/promotionChannel',
    name: '推广管理',
    icon: 'elextra-icon-promotion',
    attr: {role: ['admin', 'boss']},
    children: [
      {
        path: 'promotionChannel',
        component: promotionChannel,
        icon: 'el-icon-star-on',
        name: '推广渠道',
        attr: {role: ['boss']},
        meta: ['推广管理', '推广渠道']
      },
      {
        path: 'promoterManagement',
        component: promoterManagement,
        icon: 'el-icon-star-on',
        name: '推广员管理',
        attr: {role: ['boss']},
        meta: ['推广管理', '推广员管理']
      },
      {
        path: 'promotionChannelStatistics',
        component: promotionChannelStatistics,
        name: '推广统计(渠道)',
        icon: 'el-icon-star-on',
        attr: {role: ['finance', 'boss']},
        meta: ['推广管理', '推广统计(渠道)']
      }, {
        path: 'promotionRegionStatistics',
        component: promotionRegionStatistics,
        icon: 'el-icon-star-on',
        name: '推广统计(地区)',
        attr: {role: ['boss']},
        meta: ['推广管理', '推广统计(地区)']
      }, {
        path: 'channelStatisticsSummary',
        component: channelStatisticsSummary,
        name: '渠道统计汇总',
        icon: 'el-icon-star-on',
        attr: {role: ['finance', 'boss']},
        meta: ['推广管理', '渠道统计汇总']
      }, {
        path: 'registrationStatisticsReport',
        component: registrationStatisticsReport,
        name: '注册量统计报表',
        icon: 'el-icon-star-on',
        attr: {role: ['finance', 'boss']},
        meta: ['推广管理', '注册量统计报表']
      }, {
        path: 'PVUV',
        icon: 'el-icon-star-on',
        component: PVUV,
        name: '贷款超市-PVUV',
        meta: ['推广管理', '贷款超市-PVUV'],
        attr: {role: ['admin']}
      }
    ]
  }, {
    path: '/privilegeManage',
    component: Layout,
    redirect: '/privilegeManage/employeeList',
    name: '权限管理',
    icon: 'elextra-icon-privilage',
    children: [
      {
        path: 'employeeList',
        component: employeeList,
        icon: 'el-icon-star-on',
        name: '员工信息',
        meta: ['权限管理', '员工信息'],
        attr: {role: ['boss']}
      }
    ]
  },
  {path: '*', component: error, hidden: true}
]
