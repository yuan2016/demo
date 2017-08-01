let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let moment = require('moment')
let tableName = require('../../../../config/tableName')
let {formatCurrency} = require('../../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.d_date) {
      row.d_date = moment(row.d_date).format('YYYY-MM-DD')
    }
    if (row.create_time) {
      row.create_time = moment(row.create_time).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.overdue_index_s1) {
      row.overdue_index_s1 = (row.overdue_index_s1 * 100).toFixed(2) + '%'
    }
    if (row.overdue_index_s2) {
      row.overdue_index_s2 = (row.overdue_index_s2 * 100).toFixed(2) + '%'
    }
    if (row.overdue_index_m2) {
      row.overdue_index_m2 = (row.overdue_index_m2 * 100).toFixed(2) + '%'
    }
    if (row.overdue_index_m3) {
      row.overdue_index_m3 = (row.overdue_index_m3 * 100).toFixed(2) + '%'
    }
    if (row.overdue_index_m4) {
      row.overdue_index_m4 = (row.overdue_index_m4 * 100).toFixed(2) + '%'
    }

    if (row.overdue_total) {
      row.overdue_total = formatCurrency(row.overdue_total)
    }
    if (row.overdue_payment_s1) {
      row.overdue_payment_s1 = formatCurrency(row.overdue_payment_s1)
    }
    if (row.late_fee_s1) {
      row.late_fee_s1 = formatCurrency(row.late_fee_s1)
    }
    if (row.overdue_payment_s2) {
      row.overdue_payment_s2 = formatCurrency(row.overdue_payment_s2)
    }
    if (row.late_fee_s2) {
      row.late_fee_s2 = formatCurrency(row.late_fee_s2)
    }
    if (row.overdue_payment_m2) {
      row.overdue_payment_m2 = formatCurrency(row.overdue_payment_m2)
    }
    if (row.late_fee_m2) {
      row.late_fee_m2 = formatCurrency(row.late_fee_m2)
    }
    if (row.overdue_payment_m3) {
      row.overdue_payment_m3 = formatCurrency(row.overdue_payment_m3)
    }
    if (row.late_fee_m3) {
      row.late_fee_m3 = formatCurrency(row.late_fee_m3)
    }
    if (row.bad_debt_m3) {
      row.bad_debt_m3 = formatCurrency(row.bad_debt_m3)
    }
    if (row.comp_late_fee) {
      row.comp_late_fee = formatCurrency(row.comp_late_fee)
    }
    if (row.accu_late_fee) {
      row.accu_late_fee = formatCurrency(row.accu_late_fee)
    }
    return row
  })
}

module.exports = {
  //每日还款金额数据
  fetchAll (req, res) {
    let params = req.body
    func.connPool1(sql.dataAnalysis.selectAll, [tableName.collectionManagement, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
        if (err.message === 'Query inactivity timeout') {
          res.json({
            code: '1024'
          })
        } else {
          res.json({
            code: '404'
          })
        }
        return
      }
      rs = formatData(rs)
      res.json(rs)
    })
  },
  //每日还款金额数据总条数
  getCount (req, res) {
    let params = req.body
    func.connPool1(sql.dataAnalysis.getCount, [tableName.collectionManagement, params.startTime, params.endTime], function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
        if (err.message === 'Query inactivity timeout') {
          res.json({
            code: '1024'
          })
        } else {
          res.json({
            code: '404'
          })
        }
        return
      }
      res.json(rs)
    })
  }
}
