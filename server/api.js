let path = '/api'

module.exports = {
  // dataAnalysis
  dailyLendingData: path + '/dailyLendingData',
  // 每日还款单位数据
  dailyRepaymentUnitData: path + '/dailyRepaymentUnitData',
  dailyRepaymentUnitDataCount: path + '/dailyRepaymentUnitData/count',
  daysStageStatistics: path + '/daysStageStatistics',
  // 每日还款金额数据
  dailyRepaymentAmountData: path + '/dailyRepaymentAmountData',
  dailyRepaymentAmountDataCount: path + '/dailyRepaymentAmountData/count',
  overdueRepaymentStatistics: path + '/overdueRepaymentStatistics',
  fundAnalysis: path + '/fundAnalysis',
  collectionManagement: path + '/collectionManagement'
}
