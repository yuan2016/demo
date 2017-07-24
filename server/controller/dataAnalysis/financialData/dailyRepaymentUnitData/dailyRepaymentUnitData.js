let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let moment = require('moment')
let tableName = require('../../../../config/tableName')
let {formatCurrency} = require('../../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.d_date){
      row.d_date = moment(row.d_date).format('YYYY-MM-DD')
    }

    if (row.overdue_num) {
      row.overdue_num = formatCurrency(row.overdue_num)
    }
    if (row.overdue_num_7day) {
      row.overdue_num_7day = formatCurrency(row.overdue_num_7day)
    }
    if (row.overdue_num_14day) {
      row.overdue_num_14day = formatCurrency(row.overdue_num_14day)
    }

    if (row.overdue_rate) {
      row.overdue_rate = (row.overdue_rate * 100).toFixed(2) + '%'
    }
    if (row.repayment_rate) {
      row.repayment_rate = (row.repayment_rate * 100).toFixed(2) + '%'
    }
    if (row.overdue_rate_7day) {
      row.overdue_rate_7day = (row.overdue_rate_7day * 100).toFixed(2) + '%'
    }
    if (row.overdue_rate_14day) {
      row.overdue_rate_14day = (row.overdue_rate_14day * 100).toFixed(2) + '%'
    }
    if (row.overdue_rate_ouser) {
      row.overdue_rate_ouser = (row.overdue_rate_ouser * 100).toFixed(2) + '%'
    }
    if (row.repayment_rate_ouser) {
      row.repayment_rate_ouser = (row.repayment_rate_ouser * 100).toFixed(2) + '%'
    }
    if (row.overdue_rate_nuser) {
      row.overdue_rate_nuser = (row.overdue_rate_nuser * 100).toFixed(2) + '%'
    }
    if (row.repayment_rate_nuser) {
      row.repayment_rate_nuser = (row.repayment_rate_nuser * 100).toFixed(2) + '%'
    }
    return row
  })
}

module.exports = {
  //每日还款金额数据
  fetchAll (req, res) {
    let params = req.body
    func.connPool1(sql.dataAnalysis.selectAll, [tableName.dailyRepaymentUnitData, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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
    func.connPool1(sql.dataAnalysis.getCount, [tableName.dailyRepaymentUnitData, params.startTime, params.endTime], function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
        throw new Error(err)
      }
      res.json(rs)
    })
  }
}
