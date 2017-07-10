let path = '/api'

module.exports = {
  // 每日还款单位数据
  dailyRepaymentUnitData: path + '/dailyRepaymentUnitData',
  dailyRepaymentUnitDataCount: path + '/dailyRepaymentUnitData/count',
  // 每日还款金额数据
  dailyRepaymentAmountData: path + '/dailyRepaymentAmountData',
  dailyRepaymentAmountDataCount: path + '/dailyRepaymentAmountData/count',
  // 21天分期统计
  daysStageStatistics21: path + '/daysStageStatistics21',
  daysStageStatistics21Count: path + '/daysStageStatistics21/count',
  // 每日放款数据
  dailyLendingData: path + '/dailyLendingData',
  dailyLendingDataCount: path + '/dailyLendingData/count'
}
