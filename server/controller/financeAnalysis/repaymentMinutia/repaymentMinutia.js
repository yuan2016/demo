let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')
let {analysis, formatCurrency} = require('../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.credit_repayment_time) {
      row.credit_repayment_time = moment(row.credit_repayment_time).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.d_date) {
      row.d_date = moment(row.d_date).format('YYYY-MM-DD')
    }
    if (row.repayment_time) {
      row.repayment_time = moment(row.repayment_time).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.repayment_real_time) {
      row.repayment_real_time = moment(row.repayment_real_time).format('YYYY-MM-DD HH:mm:ss')
    }

    if (row.loan_money) {
      row.loan_money = formatCurrency(row.loan_money)
    }
    if (row.repayment_amount) {
      row.repayment_amount = formatCurrency(row.repayment_amount)
    }
    if (row.repaymented_amount) {
      row.repaymented_amount = formatCurrency(row.repaymented_amount)
    }
    if (row.repayment_real_money) {
      row.repayment_real_money = formatCurrency(row.repayment_real_money)
    }
    if (row.return_money) {
      row.return_money = formatCurrency(row.return_money)
    }
    if (row.Reduction_money) {
      row.Reduction_money = formatCurrency(row.Reduction_money)
    }
    return row
  })
}

module.exports = {
  //每日还款金额数据
  fetchAll (req, res) {
    let params = req.body
    let queries = analysis(params)
    let query = sql.financeAnalysis.repaymentMinutia.selectAllFront + queries.slice(0, 3).join(' and ') + sql.financeAnalysis.repaymentMinutia.selectAllBack
    func.connPool1(query, [tableName.repaymentMinutia, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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
    let queries = analysis(params)
    let query = sql.financeAnalysis.repaymentMinutia.getCount + queries.slice(0, 3).join(' and ')
    func.connPool1(query, [tableName.repaymentMinutia, params.startTime, params.endTime], function (err, rs) {
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
  },
  getExcelData (req, res) {
    let params = req.body
    let queries = analysis(params)
    let query = sql.financeAnalysis.repaymentMinutia.selectAllFront + queries.slice(0, 3).join(' and ')
    func.connPool1(query, [tableName.repaymentMinutia, params.startTime, params.endTime], function (err, rs) {
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
    }, 70000)
  }
}
