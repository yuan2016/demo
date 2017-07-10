let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')

function formatData (rows) {
  return rows.map(row => {
    row.d_date = moment(row.d_date).format('YYYY-MM-DD')
    row.overdue_rate = row.overdue_rate + '%'
    row.repayment_rate = row.repayment_rate + '%'
    row.overdue_rate_7day = row.overdue_rate_7day + '%'
    row.overdue_rate_14day = row.overdue_rate_14day + '%'
    row.overdue_rate_ouser = row.overdue_rate_ouser + '%'
    row.repayment_rate_ouser = row.repayment_rate_ouser + '%'
    row.overdue_rate_nuser = row.overdue_rate_nuser + '%'
    row.repayment_rate_nuser = row.repayment_rate_nuser + '%'
    return row
  })
}

module.exports = {
  //每日还款金额数据
  fetchAll (req, res) {
    let params = req.body
    func.connPool(sql.dataAnalysis.selectAll, [tableName.dailyRepaymentUnitData, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
        throw new Error(err)
      }
      rs = formatData(rs)
      res.json(rs)
    })
  },
  //每日还款金额数据总条数
  getCount (req, res) {
    let params = req.body
    func.connPool(sql.dataAnalysis.getCount, [tableName.dailyRepaymentUnitData, params.startTime, params.endTime], function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
        throw new Error(err)
      }
      res.json(rs)
    })
  }
}
