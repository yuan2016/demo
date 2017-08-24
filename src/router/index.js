import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

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
const loanThroughRate = r => require.ensure([], () => r(require('../components/page/RMAB/loanThroughRate/loanThroughRate')), 'loanThroughRate')
const loanThroughRateAll = r => require.ensure([], () => r(require('../components/page/RMAB/loanThroughRate/loanThroughRateAll')), 'loanThroughRateAll')
const loanOverdueRecallRate = r => require.ensure([], () => r(require('../components/page/RMAB/loanOverdueRecallRate/loanOverdueRecallRate')), 'loanOverdueRecallRate')
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

Vue.use(Router)

export default [
  {path: '/', redirect: '/login'},
  {path: '/login', component: login},
  {
    path: '/home',
    component: home,
    children: [{path: '', redirect: '/main'}, {
      path: '/main',
      component: main,
      meta: []
    }, {
      path: '/404',
      component: error,
      meta: []
    }, {
      path: '/passwordModify',
      component: passwordModify,
      meta: ['修改密码']
    }, {
      path: '/userList',
      component: userList,
      meta: ['用户信息管理', '用户列表']
    }, {
      path: '/userAddressBook',
      component: userAddressBook,
      meta: ['用户信息管理', '用户通讯录']
    }, {
      path: '/bankCardsList',
      component: bankCardsList,
      meta: ['用户信息管理', '银行卡列表']
    }, {
      path: '/userNameAuthenticationList',
      component: userNameAuthenticationList,
      meta: ['用户信息管理', '用户实名认证列表']
    }, {
      path: '/userAuthenticationList',
      component: userAuthenticationList,
      meta: ['用户信息管理', '用户认证列表']
    }, {
      path: '/loanThroughRate',
      component: loanThroughRate,
      meta: ['RMAB', '借款通过率']
    }, {
      path: '/loanThroughRateAll',
      component: loanThroughRateAll,
      meta: ['RMAB', '借款通过率']
    }, {
      path: '/loanOverdueRecallRate',
      component: loanOverdueRecallRate,
      meta: ['RMAB', '借款逾期催回率']
    }, {
      path: '/loanApplicationsList',
      component: loanApplicationsList,
      meta: ['借款管理', '借款申请列表']
    }, {
      path: '/loanAuditList',
      component: loanAuditList,
      meta: ['借款管理', '放款审核列表']
    }, {
      path: '/raiseQuotaRecord',
      component: raiseQuotaRecord,
      meta: ['借款管理', '提额记录表']
    }, {
      path: '/reconciliationFunction',
      component: reconciliationFunction,
      meta: ['借款管理', '对账功能']
    }, {
      path: '/assetInformation',
      component: assetInformation,
      meta: ['借款管理', '资产信息-招财猫']
    }, {
      path: '/waitingForReturnList',
      component: waitingForReturnList,
      meta: ['还款管理', '还款列表', '待还列表']
    }, {
      path: '/returnedList',
      component: returnedList,
      meta: ['还款管理', '还款列表', '已还列表']
    }, {
      path: '/repaymentReconciliation',
      component: repaymentReconciliation,
      meta: ['还款管理', '对账列表', '还款对账']
    }, {
      path: '/renewalReconciliation',
      component: renewalReconciliation,
      meta: ['还款管理', '对账列表', '续期对账']
    }, {
      path: '/repaymentDetails',
      component: repaymentDetails,
      meta: ['还款管理', '退款列表', '还款详情']
    }, {
      path: '/renewalParticulars',
      component: renewalParticulars,
      meta: ['还款管理', '退款列表', '续期详情']
    }, {
      path: '/rebackedList',
      component: rebackedList,
      meta: ['还款管理', '退款列表', '已退列表']
    }, {
      path: '/renewalsList',
      component: renewalsList,
      meta: ['还款管理', '续期管理', '续期列表']
    }, {
      path: '/dailyLendingData',
      component: dailyLendingData,
      meta: ['数据分析', '每日放款数据']
    }, {
      path: '/dailyRepaymentUnitData',
      component: dailyRepaymentUnitData,
      meta: ['数据分析', '财务数据', '每日还款单位数据']
    }, {
      path: '/daysStageStatistics',
      component: daysStageStatistics,
      meta: ['数据分析', '财务数据', '21天分期统计']
    }, {
      path: '/daysStageStatistics90',
      component: daysStageStatistics90,
      meta: ['数据分析', '财务数据', '90天分期统计']
    }, {
      path: '/installmentPromotionStatistics',
      component: installmentPromotionStatistics,
      meta: ['数据分析', '财务数据', '21天分期提额统计']
    }, {
      path: '/dailyRepaymentAmountData',
      component: dailyRepaymentAmountData,
      meta: ['数据分析', '财务数据', '每日还款金额数据']
    }, {
      path: '/overdueRepaymentStatistics',
      component: overdueRepaymentStatistics,
      meta: ['数据分析', '财务数据', '还款逾期统计']
    }, {
      path: '/fundAnalysis',
      component: fundAnalysis,
      meta: ['数据分析', '财务数据', '资金分析']
    }, {
      path: '/fundAnalysisProduct',
      component: fundAnalysisProduct,
      meta: ['数据分析', '财务数据', '资金分析(分产品)']
    }, {
      path: '/collectionManagement',
      component: collectionManagement,
      meta: ['数据分析', '财务数据', '催收管理']
    }, {
      path: '/platformData',
      component: platformData,
      meta: ['数据分析', '数据报表', '平台数据']
    }, {
      path: '/reconciliationAnalysis',
      component: reconciliationAnalysis,
      meta: ['财务分析', '对账分析']
    }, {
      path: '/repaymentMinutia',
      component: repaymentMinutia,
      meta: ['财务分析', '还款明细']
    }, {
      path: '/reportStatistics',
      component: reportStatistics,
      meta: ['财务分析', '对账分析']
    }, {
      path: '/promotionChannel',
      component: promotionChannel,
      meta: ['推广管理', '推广渠道']
    }, {
      path: '/promoterManagement',
      component: promoterManagement,
      meta: ['推广管理', '推广员管理']
    }, {
      path: '/promotionChannelStatistics',
      component: promotionChannelStatistics,
      meta: ['推广管理', '推广统计(渠道)']
    }, {
      path: '/promotionRegionStatistics',
      component: promotionRegionStatistics,
      meta: ['推广管理', '推广统计(地区)']
    }, {
      path: '/channelStatisticsSummary',
      component: channelStatisticsSummary,
      meta: ['推广管理', '渠道统计汇总']
    }, {
      path: '/registrationStatisticsReport',
      component: registrationStatisticsReport,
      meta: ['推广管理', '注册量统计报表']
    }]
  }, {
    path: '*',
    component: error
  }]

