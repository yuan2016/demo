let express = require('express')

//登录验证
let login = require('../controller/login/login')
//首页
let main = require('../controller/main/main')
//用户信息管理
let userList = require('../controller/userInformationManagement/userList/userList')
let userAddressBook = require('../controller/userInformationManagement/userAddressBook/userAddressBook')
let bankcardsList = require('../controller/userInformationManagement/bankcardsList/bankcardsList')
let userNameAuthenticationList = require('../controller/userInformationManagement/userNameAuthenticationList/userNameAuthenticationList')
let userAuthenticationList = require('../controller/userInformationManagement/userAuthenticationList/userAuthenticationList')
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
let dailyLendingData = require('../controller/dataAnalysis/financialData/dailyLendingData/dailyLendingData')
let overdueRepaymentStatistics = require('../controller/dataAnalysis/financialData/overdueRepaymentStatistics/overdueRepaymentStatistics')
let fundAnalysis = require('../controller/dataAnalysis/financialData/fundAnalysis/fundAnalysis')
let collectionManagement = require('../controller/dataAnalysis/financialData/collectionManagement/collectionManagement')
let platformData = require('../controller/dataAnalysis/dataReport/platformData/platformData')
// 推广管理
let promotionChannel = require('../controller/promotionManagement/promotionChannel/promotionChannel')
let promoterManagement = require('../controller/promotionManagement/promoterManagement/promoterManagement')
let promotionChannelStatistics = require('../controller/promotionManagement/promotionChannelStatistics/promotionChannelStatistics')
let promotionRegionStatistics = require('../controller/promotionManagement/promotionRegionStatistics/promotionRegionStatistics')

let api = require('../api')

let router = express.Router()

/*登录验证*/
router.post(api.login, login.fetchAll)
/*首页*/
router.post(api.main, main.fetchAll)
/*用户信息管理*/
// 用户列表
// router.post(api.userListCount, userList.getCount)
router.post(api.userList, userList.fetchAll)
// 用户通讯录
// router.post(api.userAddressBookCount, userAddressBook.getCount)
router.post(api.userAddressBook, userAddressBook.fetchAll)
// 银行卡列表
// router.post(api.bankcardsListCount, bankcardsList.getCount)
router.post(api.bankcardsList, bankcardsList.fetchAll)
// 用户认证列表
// router.post(api.userAuthenticationListCount, userAuthenticationList.getCount)
router.post(api.userAuthenticationList, userAuthenticationList.fetchAll)
// 用户实名认证列表
// router.post(api.userNameAuthenticationListCount, userNameAuthenticationList.getCount)
router.post(api.userNameAuthenticationList, userNameAuthenticationList.fetchAll)

/*借款管理*/
// 借款申请列表
// router.post(api.loanApplicationsListCount, loanApplicationsList.getCount)
router.post(api.loanApplicationsList, loanApplicationsList.fetchAll)

// 放款审核列表
// router.post(api.loanAuditListCount, loanAuditList.getCount)
router.post(api.loanAuditList, loanAuditList.fetchAll)

// 提额记录表
// router.post(api.raiseQuotaRecordCount, raiseQuotaRecord.getCount)
router.post(api.raiseQuotaRecord, raiseQuotaRecord.fetchAll)
// 对账功能
// router.post(api.reconciliationFunctionCount, reconciliationFunction.getCount)
router.post(api.reconciliationFunction, reconciliationFunction.fetchAll)

// 资产管理
// router.post(api.assetInformationCount, assetInformation.getCount)
router.post(api.assetInformation, assetInformation.fetchAll)

/*还款管理*/
//还款列表  待还列表
// router.post(api.waitingForReturnListCount, waitingForReturnList.getCount)
router.post(api.waitingForReturnList, waitingForReturnList.fetchAll)

//还款列表  已还列表
// router.post(api.returnedListCount, returnedList.getCount)
router.post(api.returnedList, returnedList.fetchAll)

//对账列表  还款对账
// router.post(api.repaymentReconciliationCount, repaymentReconciliation.getCount)
router.post(api.repaymentReconciliation, repaymentReconciliation.fetchAll)

//对账列表  续期对账
// router.post(api.renewalReconciliationCount, renewalReconciliation.getCount)
router.post(api.renewalReconciliation, renewalReconciliation.fetchAll)

//退款列表  还款详情
// router.post(api.repaymentDetailsCount, repaymentDetails.getCount)
router.post(api.repaymentDetails, repaymentDetails.fetchAll)

//退款列表  续期详情
// router.post(api.renewalParticularsCount, renewalParticulars.getCount)
router.post(api.renewalParticulars, renewalParticulars.fetchAll)

//退款列表  已退列表
// router.post(api.rebackedListCount, rebackedList.getCount)
router.post(api.rebackedList, rebackedList.fetchAll)

//续期管理  续期列表
// router.post(api.renewalsListCount, renewalsList.getCount)
router.post(api.renewalsList, renewalsList.fetchAll)

/*数据分析*/
// 每日还款金额数据
router.post(api.dailyRepaymentAmountDataCount, dailyRepaymentAmountData.getCount)
router.post(api.dailyRepaymentAmountData, dailyRepaymentAmountData.fetchAll)

// 每日还款单位数据
router.post(api.dailyRepaymentUnitDataCount, dailyRepaymentUnitData.getCount)
router.post(api.dailyRepaymentUnitData, dailyRepaymentUnitData.fetchAll)

// 21天分期统计
router.post(api.daysStageStatistics21Count, daysStageStatistics21.getCount)
router.post(api.daysStageStatistics21, daysStageStatistics21.fetchAll)

// 还款逾期统计
router.post(api.overdueRepaymentStatisticsCount, overdueRepaymentStatistics.getCount)
router.post(api.overdueRepaymentStatistics, overdueRepaymentStatistics.fetchAll)

// 每日放款数据
router.post(api.dailyLendingDataCount, dailyLendingData.getCount)
router.post(api.dailyLendingData, dailyLendingData.fetchAll)

// 资金分析
router.post(api.fundAnalysisCount, fundAnalysis.getCount)
router.post(api.fundAnalysis, fundAnalysis.fetchAll)

// 催收管理
router.post(api.collectionManagementCount, collectionManagement.getCount)
router.post(api.collectionManagement, collectionManagement.fetchAll)

// 平台管理
router.post(api.platformDataCount, platformData.getCount)
router.post(api.platformData, platformData.fetchAll)

/*推广管理*/
// 推广渠道
//router.post(api.promotionChannelCount, promotionChannel.getCount)
router.post(api.promotionChannel, promotionChannel.fetchAll)

// 推广员管理
//router.post(api.promoterManagementCount, promoterManagement.getCount)
router.post(api.promoterManagement, promoterManagement.fetchAll)
router.post(api.promoterManagementGetOptions, promoterManagement.getSelectOptions)

//推广统计(渠道)
router.post(api.promotionChannelStatisticsCount, promotionChannelStatistics.getCount)
router.post(api.promotionChannelStatistics, promotionChannelStatistics.fetchAll)

//推广统计(地区)
router.post(api.promotionRegionStatisticsCount, promotionRegionStatistics.getCount)
router.post(api.promotionRegionStatistics, promotionRegionStatistics.fetchAll)

module.exports = router
