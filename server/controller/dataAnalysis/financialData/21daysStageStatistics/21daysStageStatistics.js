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
    if (row.loan_date_f1) {
      row.loan_date_f1 = moment(row.loan_date_f1).format('YYYY-MM-DD')
    }
    if (row.loan_date_f2) {
      row.loan_date_f2 = moment(row.loan_date_f2).format('YYYY-MM-DD')
    }
    if (row.loan_date_f3) {
      row.loan_date_f3 = moment(row.loan_date_f3).format('YYYY-MM-DD')
    }

    if (row.due_amount_f1) {
      row.due_amount_f1 = formatCurrency(row.due_amount_f1)
    }
    if (row.repayment_amount_f1) {
      row.repayment_amount_f1 = formatCurrency(row.repayment_amount_f1)
    }
    if (row.due_amount_f2) {
      row.due_amount_f2 = formatCurrency(row.due_amount_f2)
    }
    if (row.repayment_amount_f2) {
      row.repayment_amount_f2 = formatCurrency(row.repayment_amount_f2)
    }
    if (row.due_amount_f3) {
      row.due_amount_f3 = formatCurrency(row.due_amount_f3)
    }
    if (row.repayment_amount_f3) {
      row.repayment_amount_f3 = formatCurrency(row.repayment_amount_f3)
    }

    if (row.repayment_rate_f1) {
      row.repayment_rate_f1 = (row.repayment_rate_f1 * 100).toFixed(2) + '%'
    }
    if (row.overdue_rate_f1) {
      row.overdue_rate_f1 = (row.overdue_rate_f1 * 100).toFixed(2) + '%'
    }
    if (row.overdue_rate_ouser_f1) {
      row.overdue_rate_ouser_f1 = (row.overdue_rate_ouser_f1 * 100).toFixed(2) + '%'
    }
    if (row.overdue_rate_nuser_f1) {
      row.overdue_rate_nuser_f1 = (row.overdue_rate_nuser_f1 * 100).toFixed(2) + '%'
    }
    if (row.repayment_rate_f2) {
      row.repayment_rate_f2 = (row.repayment_rate_f2 * 100).toFixed(2) + '%'
    }
    if (row.overdue_rate_f2) {
      row.overdue_rate_f2 = (row.overdue_rate_f2 * 100).toFixed(2) + '%'
    }
    if (row.overdue_rate_ouser_f2) {
      row.overdue_rate_ouser_f2 = (row.overdue_rate_ouser_f2 * 100).toFixed(2) + '%'
    }
    if (row.overdue_rate_nuser_f2) {
      row.overdue_rate_nuser_f2 = (row.overdue_rate_nuser_f2 * 100).toFixed(2) + '%'
    }
    if (row.repayment_rate_f3) {
      row.repayment_rate_f3 = (row.repayment_rate_f3 * 100).toFixed(2) + '%'
    }
    if (row.overdue_rate_f3) {
      row.overdue_rate_f3 = (row.overdue_rate_f3 * 100).toFixed(2) + '%'
    }
    if (row.overdue_rate_ouser_f3) {
      row.overdue_rate_ouser_f3 = (row.overdue_rate_ouser_f3 * 100).toFixed(2) + '%'
    }
    if (row.overdue_rate_nuser_f3) {
      row.overdue_rate_nuser_f3 = (row.overdue_rate_nuser_f3 * 100).toFixed(2) + '%'
    }
    return row
  })
}

module.exports = {
  //21天分期统计数据
  fetchAll (req, res) {
    let params = req.body
    func.connPool1(sql.dataAnalysis.selectAll, [tableName.daysStageStatistics21, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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
    func.connPool1(sql.dataAnalysis.getCount, [tableName.daysStageStatistics21, params.startTime, params.endTime], function (err, rs) {
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
