let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let moment = require('moment')
let tableName = require('../../../../config/tableName')
let {formatCurrency, handleProperty, handleTime, combine} = require('../../../../utils/utils')
let process = require('child_process')
let shell = require('../../../../config/shell')

global.installmentPromotionCount = 0

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
    let timeLimit = handleTime('d_date', params.startTime, params.endTime)
    let combined = combine(timeLimit)
    let order = ''
    if (params.order) {
      order = params.order
    } else {
      order = sql.dataAnalysis.order
    }
    let query = sql.dataAnalysis.selectAll + combined + order + sql.dataAnalysis.selectAllBack
    func.connPool1(query, [tableName.installmentPromotionStatistics21, params.offset, params.limit], function (err, rs) {
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
  //21天分期统计总条数
  getCount (req, res) {
    let params = req.body
    let timeLimit = handleTime('d_date', params.startTime, params.endTime)
    let combined = combine(timeLimit)
    let query = sql.dataAnalysis.getCount + combined
    func.connPool1(query, [tableName.installmentPromotionStatistics21], function (err, rs) {
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
  refreshData (req, res) {
    if (global.installmentPromotionCount === 0) {
      global.installmentPromotionCount++
      process.exec(shell.installmentPromotionStatistics, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error)
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 21天分期提额统计shell脚本执行失败')
          res.json({code: '500'})
          global.installmentPromotionCount = 0
        } else {
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 21天分期提额统计shell脚本执行成功')
          res.json({code: '200'})
          global.installmentPromotionCount = 0
        }
      })
      console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 21天分期提额统计开始执行shell脚本')
    } else {
      res.json({code: '400'})
    }
  }
}

