let express = require('express')
let dailyRepaymentAmountData = require('../controller/dataAnalysis/dailyRepaymentAmountData/dailyRepaymentAmountData')
let dailyRepaymentUnitData = require('../controller/dataAnalysis/dailyRepaymentUnitData/dailyRepaymentUnitData')
let daysStageStatistics21 = require('../controller/dataAnalysis/21daysStageStatistics/21daysStageStatistics')
let dailyLendingData = require('../controller/dataAnalysis/dailyLendingData/dailyLendingData')
let api = require('../api')

let router = express.Router()

// 数据分析 每日还款金额数据
router.post(api.dailyRepaymentAmountDataCount, dailyRepaymentAmountData.getCount)
router.post(api.dailyRepaymentAmountData, dailyRepaymentAmountData.fetchAll)

// 数据分析 每日还款单位数据
router.post(api.dailyRepaymentUnitDataCount, dailyRepaymentUnitData.getCount)
router.post(api.dailyRepaymentUnitData, dailyRepaymentUnitData.fetchAll)

// 数据分析 21天分期统计
router.post(api.daysStageStatistics21, daysStageStatistics21.getCount)
router.post(api.daysStageStatistics21Count, daysStageStatistics21.fetchAll)
// 数据分析 每日放款数据
router.post(api.dailyLendingData, dailyLendingData.getCount)
router.post(api.dailyLendingDataCount, dailyLendingData.fetchAll)

module.exports = router
