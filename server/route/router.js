let express = require('express')
let userList = require('../controller/userInformationManagement/userList/userList')
let userAddressBook = require('../controller/userInformationManagement/userAddressBook/userAddressBook')
let bankcardsList = require('../controller/userInformationManagement/bankcardsList/bankcardsList')
let userNameAuthenticationList = require('../controller/userInformationManagement/userNameAuthenticationList/userNameAuthenticationList')

let dailyRepaymentAmountData = require('../controller/dataAnalysis/dailyRepaymentAmountData/dailyRepaymentAmountData')
let dailyRepaymentUnitData = require('../controller/dataAnalysis/dailyRepaymentUnitData/dailyRepaymentUnitData')
let daysStageStatistics21 = require('../controller/dataAnalysis/21daysStageStatistics/21daysStageStatistics')
let dailyLendingData = require('../controller/dataAnalysis/dailyLendingData/dailyLendingData')
let api = require('../api')

let router = express.Router()
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
// 用户实名认证列表
// router.post(api.userNameAuthenticationListCount, userNameAuthenticationList.getCount)
router.post(api.userNameAuthenticationList, userNameAuthenticationList.fetchAll)

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

// 每日放款数据
router.post(api.dailyLendingDataCount, dailyLendingData.getCount)
router.post(api.dailyLendingData, dailyLendingData.fetchAll)

module.exports = router
