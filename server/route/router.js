let express = require('express')

//登录验证
let login = require('../controller/login/login')
//首页
let main = require('../controller/main/main')
//修改密码
let passwordModify = require('../controller/passwordModify/passwordModify')
//用户信息管理
let userList = require('../controller/userInformationManagement/userList/userList')
let userAddressBook = require('../controller/userInformationManagement/userAddressBook/userAddressBook')
let bankcardsList = require('../controller/userInformationManagement/bankcardsList/bankcardsList')
let userNameAuthenticationList = require('../controller/userInformationManagement/userNameAuthenticationList/userNameAuthenticationList')
let userAuthenticationList = require('../controller/userInformationManagement/userAuthenticationList/userAuthenticationList')
//RMAB
let loanThroughRate = require('../controller/RMAB/market/loanThroughRate/loanThroughRate')
let loanThroughRateAll = require('../controller/RMAB/market/loanThroughRate/loanThroughRateAll')
let loanOverdueRecallRate = require('../controller/RMAB/collection/loanOverdueRecallRate/loanOverdueRecallRate')
let userBasePortrait = require('../controller/RMAB/userPortrait/userBasePortrait/userBasePortrait')
let invitationEvent = require('../controller/RMAB/operate/invitationEvent/invitationEvent')
let PVUV = require('../controller/promotionManagement/PVUV/PVUV')
//借款管理
let loanApplicationsList = require('../controller/loanManagement/loanApplicationsList/loanApplicationsList')
let loanAuditList = require('../controller/loanManagement/loanAuditList/loanAuditList')
let raiseQuotaRecord = require('../controller/loanManagement/raiseQuotaRecord/raiseQuotaRecord')
let reconciliationFunction = require('../controller/loanManagement/reconciliationFunction/reconciliationFunction')
let assetInformation = require('../controller/loanManagement/assetInformation/assetInformation')
//还款管理
let waitingForReturnList = require('../controller/repaymentManagement/repaymentList/waitingForReturnList/waitingForReturnList')
let returnedList = require('../controller/repaymentManagement/repaymentList/returnedList/returnedList')
let repaymentReconciliation = require('../controller/repaymentManagement/reconciliationList/repaymentReconciliation/repaymentReconciliation')
let renewalReconciliation = require('../controller/repaymentManagement/reconciliationList/renewalReconciliation/renewalReconciliation')
let repaymentDetails = require('../controller/repaymentManagement/refundList/repaymentDetails/repaymentDetails')
let renewalParticulars = require('../controller/repaymentManagement/refundList/renewalParticulars/renewalParticulars')
let rebackedList = require('../controller/repaymentManagement/refundList/rebackedList/rebackedList')
//续期管理
let renewalsList = require('../controller/repaymentManagement/renewalManagement/renewalsList/renewalsList')
//数据分析
let dailyRepaymentAmountData = require('../controller/dataAnalysis/financialData/dailyRepaymentAmountData/dailyRepaymentAmountData')
let dailyRepaymentUnitData = require('../controller/dataAnalysis/financialData/dailyRepaymentUnitData/dailyRepaymentUnitData')
let daysStageStatistics21 = require('../controller/dataAnalysis/financialData/21daysStageStatistics/21daysStageStatistics')
let daysStageStatistics90 = require('../controller/dataAnalysis/financialData/90daysStageStatistics/90daysStageStatistics')
let installmentPromotionStatistics21 = require('../controller/dataAnalysis/financialData/21installmentPromotionStatistics/21installmentPromotionStatistics')
let dailyLendingData = require('../controller/dataAnalysis/financialData/dailyLendingData/dailyLendingData')
let overdueRepaymentStatistics = require('../controller/dataAnalysis/financialData/overdueRepaymentStatistics/overdueRepaymentStatistics')
let fundAnalysis = require('../controller/dataAnalysis/financialData/fundAnalysis/fundAnalysis')
let fundAnalysisProduct = require('../controller/dataAnalysis/financialData/fundAnalysisProduct/fundAnalysisProduct')
let collectionManagement = require('../controller/dataAnalysis/financialData/collectionManagement/collectionManagement')
let promptAmount = require('../controller/dataAnalysis/financialData/promptAmount/promptAmount')
let platformData = require('../controller/dataAnalysis/dataReport/platformData/platformData')

//财务分析
let repaymentMinutia = require('../controller/financeAnalysis/repaymentMinutia/repaymentMinutia')
let reconciliationAnalysis = require('../controller/financeAnalysis/reconciliationAnalysis/reconciliationAnalysis')
let reportStatistics = require('../controller/financeAnalysis/reportStatistics/reportStatistics')
// 推广管理
let promotionChannel = require('../controller/promotionManagement/promotionChannel/promotionChannel')
let promoterManagement = require('../controller/promotionManagement/promoterManagement/promoterManagement')
let promotionChannelStatistics = require('../controller/promotionManagement/promotionChannelStatistics/promotionChannelStatistics')
let promotionRegionStatistics = require('../controller/promotionManagement/promotionRegionStatistics/promotionRegionStatistics')
let channelStatisticsSummary = require('../controller/promotionManagement/channelStatisticsSummary/channelStatisticsSummary')
//权限管理
//员工信息
let employeeList = require('../controller/privilegeManage/employeeList/employeeList')
let api = require('../api')

let router = express.Router()

/*登录验证*/
router.post(api.login, login.login)
router.post(api.login, login.getRoles)
/*首页*/
router.post(api.main, main.fetchAll)
/*修改密码*/
router.post(api.passwordConfirm, passwordModify.confirm)
router.post(api.passwordModify, passwordModify.modify)
/*用户信息管理*/
// 用户列表
router.post(api.userListCount, userList.getCount)
router.post(api.userList, userList.fetchAll)
// 用户通讯录
router.post(api.userAddressBookCount, userAddressBook.getCount)
router.post(api.userAddressBook, userAddressBook.fetchAll)
// 银行卡列表
router.post(api.bankcardsListCount, bankcardsList.getCount)
router.post(api.bankcardsList, bankcardsList.fetchAll)
// 用户认证列表
router.post(api.userAuthenticationListCount, userAuthenticationList.getCount)
router.post(api.userAuthenticationList, userAuthenticationList.fetchAll)
// 用户实名认证列表
router.post(api.userNameAuthenticationListCount, userNameAuthenticationList.getCount)
router.post(api.userNameAuthenticationList, userNameAuthenticationList.fetchAll)

/*RMAB*/
// 借款通过率
router.post(api.loanThroughRate, loanThroughRate.fetchAll)
router.post(api.loanThroughRateAll, loanThroughRateAll.fetchAll)
router.get(api.loanThroughRateExcel, loanThroughRate.getExcelData)
router.post(api.loanOverdueRecallRate, loanOverdueRecallRate.fetchAll)
router.post(api.invitationEvent, invitationEvent.fetchAll)
//用户基础画像
router.post(api.userBasePortraitCount, userBasePortrait.getCount)
router.post(api.userBasePortrait, userBasePortrait.fetchAll)
/*借款管理*/
// 借款申请列表
router.post(api.loanApplicationsListCount, loanApplicationsList.getCount)
router.post(api.loanApplicationsList, loanApplicationsList.fetchAll)

// 放款审核列表
router.post(api.loanAuditListCount, loanAuditList.getCount)
router.post(api.loanAuditList, loanAuditList.fetchAll)

// 提额记录表
router.post(api.raiseQuotaRecordCount, raiseQuotaRecord.getCount)
router.post(api.raiseQuotaRecord, raiseQuotaRecord.fetchAll)
// 对账功能
router.post(api.reconciliationFunctionCount, reconciliationFunction.getCount)
router.post(api.reconciliationFunction, reconciliationFunction.fetchAll)

// 资产管理
router.post(api.assetInformationCount, assetInformation.getCount)
router.post(api.assetInformation, assetInformation.fetchAll)

/*还款管理*/
//还款列表  待还列表
router.post(api.waitingForReturnListCount, waitingForReturnList.getCount)
router.post(api.waitingForReturnList, waitingForReturnList.fetchAll)

//还款列表  已还列表
router.post(api.returnedListCount, returnedList.getCount)
router.post(api.returnedList, returnedList.fetchAll)

//对账列表  还款对账
router.post(api.repaymentReconciliationCount, repaymentReconciliation.getCount)
router.post(api.repaymentReconciliation, repaymentReconciliation.fetchAll)

//对账列表  续期对账
router.post(api.renewalReconciliationCount, renewalReconciliation.getCount)
router.post(api.renewalReconciliation, renewalReconciliation.fetchAll)

//退款列表  还款详情
router.post(api.repaymentDetailsCount, repaymentDetails.getCount)
router.post(api.repaymentDetails, repaymentDetails.fetchAll)

//退款列表  续期详情
router.post(api.renewalParticularsCount, renewalParticulars.getCount)
router.post(api.renewalParticulars, renewalParticulars.fetchAll)

//退款列表  已退列表
router.post(api.rebackedListCount, rebackedList.getCount)
router.post(api.rebackedList, rebackedList.fetchAll)

//续期管理  续期列表
router.post(api.renewalsListCount, renewalsList.getCount)
router.post(api.renewalsList, renewalsList.fetchAll)

/*数据分析*/
// 每日还款金额数据
router.post(api.dailyRepaymentAmountDataCount, dailyRepaymentAmountData.getCount)
router.post(api.dailyRepaymentAmountData, dailyRepaymentAmountData.fetchAll)
router.post(api.dailyRepaymentAmountDataRefresh, dailyRepaymentAmountData.refreshData)
// 每日还款单位数据
router.post(api.dailyRepaymentUnitDataCount, dailyRepaymentUnitData.getCount)
router.post(api.dailyRepaymentUnitData, dailyRepaymentUnitData.fetchAll)
router.post(api.dailyRepaymentUnitDataRefresh, dailyRepaymentUnitData.refreshData)
// 21天分期统计
router.post(api.daysStageStatistics21Count, daysStageStatistics21.getCount)
router.post(api.daysStageStatistics21, daysStageStatistics21.fetchAll)
router.post(api.daysStageStatistics21Refresh, daysStageStatistics21.refreshData)
// 90天分期统计
router.post(api.daysStageStatistics90Count, daysStageStatistics90.getCount)
router.post(api.daysStageStatistics90, daysStageStatistics90.fetchAll)
router.post(api.daysStageStatistics90Refresh, daysStageStatistics90.refreshData)
// 21天分期提额统计
router.post(api.installmentPromotionStatistics21Count, installmentPromotionStatistics21.getCount)
router.post(api.installmentPromotionStatistics21, installmentPromotionStatistics21.fetchAll)
router.post(api.installmentPromotionStatistics21Refresh, installmentPromotionStatistics21.refreshData)

// 还款逾期统计
router.post(api.overdueRepaymentStatisticsCount, overdueRepaymentStatistics.getCount)
router.post(api.overdueRepaymentStatistics, overdueRepaymentStatistics.fetchAll)
router.post(api.overdueRepaymentStatisticsRefresh, overdueRepaymentStatistics.refreshData)
router.get(api.overdueRepaymentStatisticsExcel, overdueRepaymentStatistics.getExcelData)
// 每日放款数据
router.post(api.dailyLendingDataCount, dailyLendingData.getCount)
router.post(api.dailyLendingData, dailyLendingData.fetchAll)
router.post(api.dailyLendingDataRefresh, dailyLendingData.refreshData)
router.get(api.dailyLendingDataExcel, dailyLendingData.getExcelData)

// 资金分析
router.post(api.fundAnalysisCount, fundAnalysis.getCount)
router.post(api.fundAnalysis, fundAnalysis.fetchAll)
router.post(api.fundAnalysisRefresh, fundAnalysis.refreshData)
router.get(api.fundAnalysisExcel, fundAnalysis.getExcelData)

// 资金分析（产品）
router.post(api.fundAnalysisProductCount, fundAnalysisProduct.getCount)
router.post(api.fundAnalysisProduct, fundAnalysisProduct.fetchAll)
router.post(api.fundAnalysisProductRefresh, fundAnalysisProduct.refreshData)

// 催收管理
router.post(api.collectionManagementCount, collectionManagement.getCount)
router.post(api.collectionManagement, collectionManagement.fetchAll)
router.post(api.collectionManagementRefresh, collectionManagement.refreshData)
// 在催金额
router.post(api.promptAmountCount, promptAmount.getCount)
router.post(api.promptAmount, promptAmount.fetchAll)
router.post(api.promptAmountRefresh, promptAmount.refreshData)
// 平台管理
router.post(api.platformDataCount, platformData.getCount)
router.post(api.platformData, platformData.fetchAll)
router.post(api.platformDataRefresh, platformData.refreshData)
/*财务分析*/
//还款明细表
router.post(api.repaymentMinutiaCount, repaymentMinutia.getCount)
router.post(api.repaymentMinutia, repaymentMinutia.fetchAll)
router.get(api.repaymentMinutiaExcel, repaymentMinutia.getExcelData)
//对账分析表
router.post(api.reconciliationAnalysisCount, reconciliationAnalysis.getCount)
router.post(api.reconciliationAnalysis, reconciliationAnalysis.fetchAll)
router.get(api.reconciliationAnalysisExcel, reconciliationAnalysis.getExcelData)
router.post(api.reconciliationAnalysisModify, reconciliationAnalysis.modify)
//还款日报表统计
router.post(api.reportStatisticsCount, reportStatistics.getCount)
router.post(api.reportStatistics, reportStatistics.fetchAll)
router.get(api.reportStatisticsExcel, reportStatistics.getExcelData)
/*推广管理*/
// 推广渠道
router.post(api.promotionChannelCount, promotionChannel.getCount)
router.post(api.promotionChannel, promotionChannel.fetchAll)

// 推广员管理
router.post(api.promoterManagementCount, promoterManagement.getCount)
router.post(api.promoterManagement, promoterManagement.fetchAll)
router.post(api.promoterManagementGetOptions, promoterManagement.getSelectOptions)

//推广统计(渠道)
router.post(api.promotionChannelStatisticsCount, promotionChannelStatistics.getCount)
router.post(api.promotionChannelStatistics, promotionChannelStatistics.fetchAll)
router.post(api.promotionChannelStatisticsRefresh, promotionChannelStatistics.refreshData)
router.post(api.promotionChannelStatisticsGetOptions, promotionChannelStatistics.getSelectOptions)
router.get(api.promotionChannelStatisticsExcel, promotionChannelStatistics.getExcelData)
//推广统计(地区)
router.post(api.promotionRegionStatisticsCount, promotionRegionStatistics.getCount)
router.post(api.promotionRegionStatistics, promotionRegionStatistics.fetchAll)
router.post(api.promotionRegionStatisticsRefresh, promotionRegionStatistics.refreshData)
//渠道统计汇总
router.post(api.channelStatisticsSummaryCount, channelStatisticsSummary.getCount)
router.post(api.channelStatisticsSummary, channelStatisticsSummary.fetchAll)
router.post(api.channelStatisticsSummaryGetOptions, channelStatisticsSummary.getSelectOptions)
//PVUV
router.post(api.PVUVCount, PVUV.getCount)
router.post(api.PVUV, PVUV.fetchAll)
router.post(api.PVUVGetOptions, PVUV.getSelectOptions)
/*权限管理*/
//员工信息
router.post(api.employeeList, employeeList.fetchAll)
router.post(api.employeeListCount, employeeList.getCount)
router.post(api.employeeListPrivilegeModify, employeeList.privilegeModify)
module.exports = router
