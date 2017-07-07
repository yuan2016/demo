let express = require('express')
let dailyRepaymentAmountData = require('../controller/dataAnalysis/dailyRepaymentAmountData/dailyRepaymentAmountData')
let dailyRepaymentUnitData = require('../controller/dataAnalysis/dailyRepaymentUnitData/dailyRepaymentUnitData')
let api = require('../api')

let router = express.Router()

// 数据分析 每日还款金额数据
router.post(api.dailyRepaymentAmountDataCount, dailyRepaymentAmountData.getCount)
router.post(api.dailyRepaymentAmountData, dailyRepaymentAmountData.fetchAll)

// 数据分析 每日还款单位数据
router.post(api.dailyRepaymentUnitDataCount, dailyRepaymentUnitData.getCount)
router.post(api.dailyRepaymentUnitData, dailyRepaymentUnitData.fetchAll)

module.exports = router
