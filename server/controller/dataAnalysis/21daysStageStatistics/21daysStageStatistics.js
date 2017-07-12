let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')

function formatData (rows) {
  return rows.map(row => {
    row.d_date = moment(row.d_date).format('YYYY-MM-DD')
    row.loan_date_f1 = moment(row.loan_date_f1).format('YYYY-MM-DD')
    row.loan_date_f2 = moment(row.loan_date_f2).format('YYYY-MM-DD')
    row.loan_date_f3 = moment(row.loan_date_f3).format('YYYY-MM-DD')
    row.repayment_rate_f1 = row.repayment_rate_f1 + '%'
    row.overdue_rate_f1 = row.overdue_rate_f1 + '%'
    row.overdue_rate_ouser_f1 = row.overdue_rate_ouser_f1 + '%'
    row.overdue_rate_nuser_f1 = row.overdue_rate_nuser_f1 + '%'
    row.repayment_rate_f2 = row.repayment_rate_f2 + '%'
    row.overdue_rate_f2 = row.overdue_rate_f2 + '%'
    row.overdue_rate_ouser_f2 = row.overdue_rate_ouser_f2 + '%'
    row.overdue_rate_nuser_f2 = row.overdue_rate_nuser_f2 + '%'
    row.repayment_rate_f3 = row.repayment_rate_f3 + '%'
    row.overdue_rate_f3 = row.overdue_rate_f3 + '%'
    row.overdue_rate_ouser_f3 = row.overdue_rate_ouser_f3 + '%'
    row.overdue_rate_nuser_f3 = row.overdue_rate_nuser_f3 + '%'
    return row
  })
}

module.exports = {
  //21天分期统计数据
  fetchAll (req, res) {
    let params = req.body
    func.connPool(sql.dataAnalysis.selectAll, [tableName.daysStageStatistics21, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
        throw new Error(err)
      }
      rs = formatData(rs)
      res.json(rs)
    })
  },
  //21天分期统计总条数
  getCount (req, res) {
    let params = req.body
    func.connPool(sql.dataAnalysis.getCount, [tableName.daysStageStatistics21, params.startTime, params.endTime], function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
        throw new Error(err)
      }
      res.json(rs)
    })
  }
}
/**
 * Created by Administrator on 2017/7/10.
 */
