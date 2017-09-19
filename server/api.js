let path = '/api'

module.exports = {
  /*登陆验证*/
  login: path + '/login',
  getRoles: path + '/getRoles',
  /*拉取信息*/
  getLoginInfo: path + '/getLoginInfo',
  modifyInfo: path + '/modifyInfo',
  /*首页*/
  main: path + '/main',
  /*修改密码*/
  passwordConfirm: path + '/passwordConfirm',
  passwordModify: path + '/passwordModify',
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

  //RMAB
  //借款通过率
  loanThroughRate: path + '/loanThroughRate',
  loanThroughRateAll: path + '/loanThroughRateAll',
  loanThroughRateExcel: path + '/loanThroughRate/excel',
  loanOverdueRecallRate: path + '/loanOverdueRecallRate',
  invitationEvent: path + '/invitationEvent',
  // 用户基础画像
  userBasePortrait: path + '/userBasePortrait',
  userBasePortraitCount: path + '/userBasePortrait/count',
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
  dailyRepaymentUnitDataRefresh: path + '/dailyRepaymentUnitData/refresh',
  // 每日还款金额数据
  dailyRepaymentAmountData: path + '/dailyRepaymentAmountData',
  dailyRepaymentAmountDataCount: path + '/dailyRepaymentAmountData/count',
  dailyRepaymentAmountDataRefresh: path + '/dailyRepaymentAmountData/refresh',
  // 还款逾期统计
  overdueRepaymentStatistics: path + '/overdueRepaymentStatistics',
  overdueRepaymentStatisticsCount: path + '/overdueRepaymentStatistics/count',
  overdueRepaymentStatisticsRefresh: path + '/overdueRepaymentStatistics/refresh',
  overdueRepaymentStatisticsExcel: path + '/overdueRepaymentStatistics/excel',
  // 21天分期统计
  daysStageStatistics21: path + '/daysStageStatistics21',
  daysStageStatistics21Count: path + '/daysStageStatistics21/count',
  daysStageStatistics21Refresh: path + '/daysStageStatistics21/refresh',
  // 90天分期统计
  daysStageStatistics90: path + '/daysStageStatistics90',
  daysStageStatistics90Count: path + '/daysStageStatistics90/count',
  daysStageStatistics90Refresh: path + '/daysStageStatistics90/refresh',
  // 21天分期提额统计
  installmentPromotionStatistics21: path + '/installmentPromotionStatistics21',
  installmentPromotionStatistics21Count: path + '/installmentPromotionStatistics21/count',
  installmentPromotionStatistics21Refresh: path + '/installmentPromotionStatistics21/refresh',
  // 每日放款数据
  dailyLendingData: path + '/dailyLendingData',
  dailyLendingDataCount: path + '/dailyLendingData/count',
  dailyLendingDataRefresh: path + '/dailyLendingData/refresh',
  dailyLendingDataExcel: path + '/dailyLendingData/excel',
  // 资金分析
  fundAnalysis: path + '/fundAnalysis',
  fundAnalysisCount: path + '/fundAnalysis/count',
  fundAnalysisRefresh: path + '/fundAnalysis/refresh',
  fundAnalysisExcel: path + '/fundAnalysis/excel',
  // 资金分析(产品)
  fundAnalysisProduct: path + '/fundAnalysisProduct',
  fundAnalysisProductCount: path + '/fundAnalysisProduct/count',
  fundAnalysisProductRefresh: path + '/fundAnalysisProduct/refresh',
  //催收管理
  collectionManagement: path + '/collectionManagement',
  collectionManagementCount: path + '/collectionManagement/count',
  collectionManagementRefresh: path + '/collectionManagement/refresh',
  //平台数据
  platformData: path + '/platformData',
  platformDataCount: path + '/platformData/count',
  platformDataRefresh: path + '/platformData/refresh',
  //在催金额
  promptAmount: path + '/promptAmount',
  promptAmountCount: path + '/promptAmount/count',
  promptAmountRefresh: path + '/promptAmount/refresh',
  /*财务分析*/
  // 还款明细表
  repaymentMinutia: path + '/repaymentMinutia',
  repaymentMinutiaCount: path + '/repaymentMinutia/count',
  repaymentMinutiaExcel: path + '/repaymentMinutia/excel',
  // 对账分析表
  reconciliationAnalysis: path + '/reconciliationAnalysis',
  reconciliationAnalysisCount: path + '/reconciliationAnalysis/count',
  reconciliationAnalysisExcel: path + '/reconciliationAnalysis/excel',
  reconciliationAnalysisModify: path + '/reconciliationAnalysis/modify',
  //还款日报表统计
  reportStatistics: path + '/reportStatistics',
  reportStatisticsCount: path + '/reportStatistics/count',
  reportStatisticsExcel: path + '/reportStatistics/excel',
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
  promotionChannelStatisticsRefresh: path + '/promotionChannelStatistics/refresh',
  promotionChannelStatisticsGetOptions: path + '/promotionChannelStatistics/getSelectOptions',
  promotionChannelStatisticsExcel: path + '/promotionChannelStatistics/excel',
  // 推广统计(地区)
  promotionRegionStatistics: path + '/promotionRegionStatistics',
  promotionRegionStatisticsCount: path + '/promotionRegionStatistics/count',
  promotionRegionStatisticsRefresh: path + '/promotionRegionStatistics/refresh',
  //渠道统计汇总
  channelStatisticsSummary: path + '/channelStatisticsSummary',
  channelStatisticsSummaryCount: path + '/channelStatisticsSummary/count',
  channelStatisticsSummaryGetOptions: path + '/channelStatisticsSummary/getSelectOptions',
  //PVUV
  PVUV: path + '/PVUV',
  PVUVCount: path + '/PVUV/count',
  PVUVGetOptions: path + '/PVUV/getSelectOptions',
  /*权限管理*/
  // 员工信息
  employeeList: path + '/employeeList',
  employeeListCount: path + '/employeeList/count',
  employeeListPrivilegeModify: path + '/employeeList/privilegeModify'
}
