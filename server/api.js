let path = '/api'

module.exports = {
  /*用户信息管理*/
  // 用户列表
  userList: path + '/userList',
  userListCount: path + '/userList/count',
  // 用户通讯录
  userAddressBook: path + '/userAddressBook',
  userAddressBookCount: path + '/userAddressBook/count',
  // 银行卡列表
  bankcardsList: path + '/bankcardsList',
  bankcardsListCount: path + '/bankcardsList/count',
  // 用户实名认证列表
  userNameAuthenticationList: path + '/userNameAuthenticationList',
  userNameAuthenticationListCount: path + '/userNameAuthenticationList/count',

  /*数据分析*/
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
