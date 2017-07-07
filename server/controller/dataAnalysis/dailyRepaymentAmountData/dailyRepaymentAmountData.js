let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')

function formatData (rows) {
  return rows.map(row => {
    let date = moment(row.d_date).format('YYYY-MM-DD')
    row.d_date = date
    return row
  })
}

module.exports = {
  //每日还款金额数据
  fetchAll (req, res) {
    let params = req.body
    func.connPool(sql.dataAnalysis.selectAll, [tableName.dailyRepaymentAmountData, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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
    func.connPool(sql.dataAnalysis.getCount, tableName.dailyRepaymentAmountData, function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
        throw new Error(err)
      }
      res.json(rs)
    })
  }
}
