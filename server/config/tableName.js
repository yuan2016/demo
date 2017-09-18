module.exports = {
  /*登录验证*/
  login: 'PR_BS_USER',
  /*首页*/
  main: 'PR_UI_USER_STATISTIC_INFO',
  /*修改密码*/
  passwordModify: 'PR_BS_USER',
  /*用户信息管理*/
  // 用户列表
  userList: 'YH_INFO',
  // 用户通讯录
  userAddressBook: 'yh_txl',
  // 银行卡列表
  bankcardsList: 'YH_CARD',
  // 用户认证列表
  userAuthenticationList: {
    A: 'yh_info',
    B: 'yh_card'
  },
  // 用户实名认证列表
  userNameAuthenticationList: 'yh_info',
  /*RMAB*/
  // 借款通过率
  loanThroughRate: 'pr_ds_order_analysis_def',
  loanThroughRateAll: 'pr_ds_order_analysis_all',
  loanOverdueRecallRate: 'pr_ds_odu_coll_analysis',
  userBasePortrait: 'up_yh_info_analysis',
  invitationEvent: 'PR_DS_INVITATION_EVENT_RMAB_EXHIBITION',
  //PVUV
  PVUV: 'pr_ds_dkcspvuv_analysis',
  /*借款管理*/
  //借款申请列表
  loanApplicationsList: 'bw_order_info',
  //放款审核列表
  loanAuditList: 'bw_order_info',
  //提额记录表
  raiseQuotaRecord: 'yh_quota',
  //对账功能
  reconciliationFunction: {
    t1: 'bw_assetsorder_info_ext',
    t: 'bw_order_info'
  },
  //资产信息
  assetInformation: {
    t: 'bw_assetsorder_info_ext',
    t1: 'bw_order_info'
  },

  /*还款管理*/
  //还款列表  待还列表
  waitingForReturnList: {
    t: 'hk_info',
    t1: 'yh_info'
  },
  //还款列表  已还列表
  returnedList: {
    t: 'hk_info',
    t1: 'yh_info'
  },
  //对账列表  还款对账
  repaymentReconciliation: {
    t: 'hk_info',
    t1: 'yh_info',
    t2: 'hk_record'
  },
  //对账列表  续期对账
  renewalReconciliation: {
    t: 'hk_continue',
    t1: 'yh_info',
    t2: 'hk_info'
  },
  //退款列表 还款详情
  repaymentDetails: {
    t: 'hk_info',
    t1: 'hk_record',
    t2: 'yh_info'
  },
  //退款列表 续期详情
  renewalParticulars: {
    t: 'hk_continue',
    t1: 'hk_info',
    t2: 'yh_info'
  },
  //退款列表 已退列表
  rebackedList: {
    t: 'hk_record_back',
    t1: 'yh_info'
  },
  //续期管理 续期列表
  renewalsList: {
    t: 'yh_info',
    t1: 'hk_continue'
  },
  /*数据分析*/
  // 每日还款金额数据
  dailyRepaymentAmountData: 'PR_DS_REPAYMENT_MONEY_DAY',
  // 每日还款单位数据
  dailyRepaymentUnitData: 'PR_DS_REPAYMENT_NUM_DAY',
  // 21天分期统计
  daysStageStatistics21: 'PR_DS_PERIOD_STATISTICS_DAY_21',
  // 21天分期提额统计
  installmentPromotionStatistics21: 'pr_ds_period_statistics_day_quota_21',
  // 90天分期提额统计
  daysStageStatistics90: 'pr_ds_period_statistics_day_90',
  // 每日放款数据
  dailyLendingData: 'PR_DS_LOAN_DAY',
  // 还款逾期统计
  overdueRepaymentStatistics: 'PR_DS_OVERDUE_REPAYMENT_STATISTIC',
  //资金分析
  fundAnalysis: 'PR_DS_FUND_ANALYSIS',
  //资金分析（产品）
  fundAnalysisProduct: 'pr_ds_fund_analysis_prd',
  //催收管理
  collectionManagement: 'PR_DS_COLLECTION_MANAGEMENT',
  //平台数据
  platformData: 'PR_DS_PLATFORM_DATA',
  /*财务分析*/
  // 还款明细表
  repaymentMinutia: 'PR_DS_REPAYMENT_DETAIL',
  //对账分析表
  reconciliationAnalysis: {
    t: 'PR_DS_RECONCILIATION_ANALYSIS',
    t1: 'PR_DS_RECONCILIATION_ANALYSIS_CWLR'
  },
  //还款日报表统计
  reportStatistics: 'PR_DS_REPAYMENT_SUM',
  //在催金额
  promptAmount: 'PR_DS_COLLECTION_DOING',
  /*推广管理*/
  // 推广渠道
  promotionChannel: {
    t: 'canal_info',
    t1: 'canal_rate'
  },
  // 推广员管理
  promoterManagement: {
    t: 'tg_yh_info',
    t1: 'yh_info',
    t2: 'canal_info'
  },
  // 推广统计(渠道)
  promotionChannelStatistics: 'PR_PM_PROMOTION_STATISTIC_CHANNEL',
  // 推广统计(地区)
  promotionRegionStatistics: 'PR_PM_PROMOTION_STATISTIC_REGION',
  // 渠道统计汇总
  channelStatisticsSummary: 'pr_pm_channel_statistic_sum',
  /*权限管理*/
  // 员工信息
  privilegeManage: {
    employeeList: 'pr_bs_user'
  }
}
