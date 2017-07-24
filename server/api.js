let path = '/api'

module.exports = {
  /*登陆验证*/
  login: path + '/login',
  /*首页*/
  main: path + '/main',
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
  // 用户认证列表
  userAuthenticationList: path + '/userAuthenticationList',
  userAuthenticationListCount: path + '/userAuthenticationList/count',
  // 用户实名认证列表
  userNameAuthenticationList: path + '/userNameAuthenticationList',
  userNameAuthenticationListCount: path + '/userNameAuthenticationList/count',

  /*借款管理*/
  // 借款申请列表
  loanApplicationsList: path + '/loanApplicationsList',
  loanApplicationsListCount: path + '/loanApplicationsList/count',
  // 放款审核列表
  loanAuditList: path + '/loanAuditList',
  loanAuditListCount: path + '/loanAuditList/count',
  // 提额记录表
  raiseQuotaRecord: path + '/raiseQuotaRecord',
  raiseQuotaRecordCount: path + '/raiseQuotaRecord/count',
  //对账功能
  reconciliationFunction: path + '/reconciliationFunction',
  reconciliationFunctionCount: path + '/reconciliationFunction/count',
  //资产信息
  assetInformation: path + '/assetInformation',
  assetInformationCount: path + '/assetInformation/count',

  /*还款管理*/
  //还款列表  待还列表
  waitingForReturnList: path + '/waitingForReturnList',
  waitingForReturnListCount: path + '/waitingForReturnList/count',
  //还款列表  已还列表
  returnedList: path + '/returnedList',
  returnedListCount: path + '/returnedList/count',
  //对账列表  还款对账
  repaymentReconciliation: path + '/repaymentReconciliation',
  repaymentReconciliationCount: path + '/repaymentReconciliation/count',

  //对账列表  续期对账
  renewalReconciliation: path + '/renewalReconciliation',
  renewalReconciliationCount: path + '/renewalReconciliation/count',

  //退款列表  还款详情
  repaymentDetails: path + '/repaymentDetails',
  repaymentDetailsCount: path + '/repaymentDetails/count',

  //退款列表  续期详情
  renewalParticulars: path + '/renewalParticulars',
  renewalParticularsCount: path + '/renewalParticulars/count',

  //退款列表  已退列表
  rebackedList: path + '/rebackedList',
  rebackedListCount: path + '/rebackedList/count',

  //续期管理 续期列表
  renewalsList: path + '/renewalsList',
  renewalsListCount: path + '/renewalsList/count',
  /*数据分析*/
  // 每日还款单位数据
  dailyRepaymentUnitData: path + '/dailyRepaymentUnitData',
  dailyRepaymentUnitDataCount: path + '/dailyRepaymentUnitData/count',
  // 每日还款金额数据
  dailyRepaymentAmountData: path + '/dailyRepaymentAmountData',
  dailyRepaymentAmountDataCount: path + '/dailyRepaymentAmountData/count',
  // 还款逾期统计
  overdueRepaymentStatistics: path + '/overdueRepaymentStatistics',
  overdueRepaymentStatisticsCount: path + '/overdueRepaymentStatistics/count',
  // 21天分期统计
  daysStageStatistics21: path + '/daysStageStatistics21',
  daysStageStatistics21Count: path + '/daysStageStatistics21/count',
  // 每日放款数据
  dailyLendingData: path + '/dailyLendingData',
  dailyLendingDataCount: path + '/dailyLendingData/count',
  // 资金分析
  fundAnalysis: path + '/fundAnalysis',
  fundAnalysisCount: path + '/fundAnalysis/count',
  //催收管理
  collectionManagement: path + '/collectionManagement',
  collectionManagementCount: path + '/collectionManagement/count',
  //平台数据
  platformData: path + '/platformData',
  platformDataCount: path + '/platformData/count',
  /*推广管理*/
  // 推广渠道
  promotionChannel: path + '/promotionChannel',
  promotionChannelCount: path + '/promotionChannel/count',
  // 推广员管理
  promoterManagement: path + '/promoterManagement',
  promoterManagementCount: path + '/promoterManagement/count',
  promoterManagementGetOptions: path + '/promoterManagement/getSelectOptions',
  // 推广统计(渠道)
  promotionChannelStatistics: path + '/promotionChannelStatistics',
  promotionChannelStatisticsCount: path + '/promotionChannelStatistics/count',
  // 推广统计(地区)
  promotionRegionStatistics: path + '/promotionRegionStatistics',
  promotionRegionStatisticsCount: path + '/promotionRegionStatistics/count'
}
