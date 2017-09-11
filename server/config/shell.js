module.exports = {
  dailyLendingData: '/mnt/usr/local/data-integration/pan.sh -rep kettle -user admin -pass admin -dir /report -trans FRESH_数据分析_每日放款数据',
  dailyRepaymentUnitData: '/mnt/usr/local/data-integration/pan.sh -rep kettle -user admin -pass admin -dir /report -trans FRESH_数据分析_每日还款单位数据',
  daysStageStatistics: '/mnt/usr/local/data-integration/pan.sh -rep kettle -user admin -pass admin -dir /report -trans FRESH_数据分析_21天分期统计',
  daysStageStatistics90: '/mnt/usr/local/data-integration/pan.sh -rep kettle -user admin -pass admin -dir /report -trans 数据分析_90天分期统计',
  installmentPromotionStatistics: '/mnt/usr/local/data-integration/pan.sh -rep kettle -user admin -pass admin -dir /report -trans 数据分析_21天分期提额统计',
  dailyRepaymentAmountData: '/mnt/usr/local/data-integration/pan.sh -rep kettle -user admin -pass admin -dir /report -trans FRESH_数据分析_每日还款金额数据',
  overdueRepaymentStatistics: '/mnt/usr/local/data-integration/pan.sh -rep kettle -user admin -pass admin -dir /report -trans FRESH_数据分析_还款逾期统计',
  fundAnalysis: '/mnt/usr/local/data-integration/kitchen.sh -rep kettle -user admin -pass admin -dir /report -job FRESH_数据分析_资金分析',
  fundAnalysisProduct: '/mnt/usr/local/data-integration/pan.sh -rep kettle -user admin -pass admin -dir /report -trans 数据分析_资金分析_产品',
  collectionManagement: '/mnt/usr/local/data-integration/pan.sh -rep kettle -user admin -pass admin -dir /report -trans FRESH_数据分析_催收管理',
  platformData: '/mnt/usr/local/data-integration/pan.sh -rep kettle -user admin -pass admin -dir /report -trans FRESH_数据分析_平台数据',
  promotionChannelStatistics: '/mnt/usr/local/data-integration/pan.sh -rep kettle -user admin -pass admin -dir /report -trans FRESH_推广管理_推广统计（渠道）',
  promotionRegionStatistics: '/mnt/usr/local/data-integration/pan.sh -rep kettle -user admin -pass admin -dir /report -trans FRESH_推广管理_推广统计（地区）',
  promptAmount: '/mnt/usr/local/data-integration/pan.sh -rep kettle -user admin -pass admin -dir /report -trans 数据分析_在催金额'
}
