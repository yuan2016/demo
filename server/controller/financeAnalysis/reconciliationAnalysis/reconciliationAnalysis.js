let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')
let {formatCurrency} = require('../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.d_date) {
      row.d_date = moment(row.d_date).format('YYYY-MM-DD')
    }

    if (row.AMT_FY) {
      row.AMT_FY = formatCurrency(row.AMT_FY)
    }
    if (row.AMT_LL) {
      row.AMT_LL = formatCurrency(row.AMT_LL)
    }
    if (row.AMT_ZFB) {
      row.AMT_ZFB = formatCurrency(row.AMT_ZFB)
    }
    if (row.AMT_YMT) {
      row.AMT_YMT = formatCurrency(row.AMT_YMT)
    }
    if (row.AMT_JM) {
      row.AMT_JM = formatCurrency(row.AMT_JM)
    }
    return row
  })
}

module.exports = {
  //每日还款金额数据
  fetchAll (req, res) {
    let params = req.body
    let query = sql.financeAnalysis.reconciliationAnalysis.selectAllFront + sql.financeAnalysis.reconciliationAnalysis.selectAllBack
    func.connPool1(query, [tableName.reconciliationAnalysis, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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
    let query = sql.financeAnalysis.reconciliationAnalysis.getCount
    func.connPool1(query, [tableName.reconciliationAnalysis, params.startTime, params.endTime], function (err, rs) {
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
    let query = sql.financeAnalysis.reconciliationAnalysis.selectAllFront
    console.log(query)
    func.connPool1(query, [tableName.reconciliationAnalysis, params.startTime, params.endTime], function (err, rs) {
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
