let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let moment = require('moment')
let tableName = require('../../../../config/tableName')
let {formatCurrency} = require('../../../../utils/utils')
let shell = require('../../../../config/shell')
let process = require('child_process')

global.overdueCount = 0

function formatData (rows) {
  return rows.map(row => {
    if (row.d_date) {
      row.d_date = moment(row.d_date).format('YYYY-MM-DD')
    }
    if (row.loan_amount_total) {
      row.loan_amount_total = formatCurrency(row.loan_amount_total)
    }
    if (row.loan_money_total) {
      row.loan_money_total = formatCurrency(row.loan_money_total)
    }
    if (row.repayment_amount_total) {
      row.repayment_amount_total = formatCurrency(row.repayment_amount_total)
    }
    if (row.repayment_money_total) {
      row.repayment_money_total = formatCurrency(row.repayment_money_total)
    }
    if (row.quantity_overdue) {
      row.quantity_overdue = formatCurrency(row.quantity_overdue)
    }
    if (row.total_overdue) {
      row.total_overdue = formatCurrency(row.total_overdue)
    }

    if (row.m_overdue_rate_s1) {
      row.m_overdue_rate_s1 = (row.m_overdue_rate_s1 * 100).toFixed(2) + '%'
    }
    if (row.m_overdue_rate_s2) {
      row.m_overdue_rate_s2 = (row.m_overdue_rate_s2 * 100).toFixed(2) + '%'
    }
    if (row.m_overdue_rate_s3) {
      row.m_overdue_rate_s3 = (row.m_overdue_rate_s3 * 100).toFixed(2) + '%'
    }
    if (row.m_overdue_rate_m3) {
      row.m_overdue_rate_m3 = (row.m_overdue_rate_m3 * 100).toFixed(2) + '%'
    }
    if (row.n_overdue_rate_s1) {
      row.n_overdue_rate_s1 = (row.n_overdue_rate_s1 * 100).toFixed(2) + '%'
    }
    if (row.n_overdue_rate_s2) {
      row.n_overdue_rate_s2 = (row.n_overdue_rate_s2 * 100).toFixed(2) + '%'
    }
    if (row.n_overdue_rate_s3) {
      row.n_overdue_rate_s3 = (row.n_overdue_rate_s3 * 100).toFixed(2) + '%'
    }
    if (row.n_overdue_rate_m3) {
      row.n_overdue_rate_m3 = (row.n_overdue_rate_m3 * 100).toFixed(2) + '%'
    }
    return row
  })
}

module.exports = {
  //每日还款金额数据
  fetchAll (req, res) {
    let params = req.body
    func.connPool1(sql.dataAnalysis.selectAll, [tableName.overdueRepaymentStatistics, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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
    func.connPool1(sql.dataAnalysis.getCount, [tableName.overdueRepaymentStatistics, params.startTime, params.endTime], function (err, rs) {
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
    if (global.overdueCount === 0) {
      global.overdueCount++
      process.exec(shell.overdueRepaymentStatistics, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error)
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 还款逾期统计shell脚本执行失败')
          res.json({code: '500'})
          global.overdueCount = 0
        } else {
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 还款逾期统计shell脚本执行成功')
          res.json({code: '200'})
          global.overdueCount = 0
        }
      })
      console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 还款逾期统计开始执行shell脚本')
    } else {
      res.json({code: '400'})
    }
  }
}
