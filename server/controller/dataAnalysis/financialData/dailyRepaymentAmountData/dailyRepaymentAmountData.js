let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let moment = require('moment')
let tableName = require('../../../../config/tableName')
let {formatCurrency} = require('../../../../utils/utils')
let shell = require('../../../../config/shell')
let process = require('child_process')

global.dailyRepaymentAmountCount = 0

function formatData (rows) {
  return rows.map(row => {
    if (row.d_date) {
      row.d_date = moment(row.d_date).format('YYYY-MM-DD')
    }

    if (row.mature_money) {
      row.mature_money = formatCurrency(row.mature_money)
    }
    if (row.overdue_money) {
      row.overdue_money = formatCurrency(row.overdue_money)
    }
    if (row.mature_money_ouser) {
      row.mature_money_ouser = formatCurrency(row.mature_money_ouser)
    }
    if (row.overdue_money_ouser) {
      row.overdue_money_ouser = formatCurrency(row.overdue_money_ouser)
    }
    if (row.mature_money_nuser) {
      row.mature_money_nuser = formatCurrency(row.mature_money_nuser)
    }
    if (row.overdue_money_nuser) {
      row.overdue_money_nuser = formatCurrency(row.overdue_money_nuser)
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
    if (row.overdue_rate_21day) {
      row.overdue_rate_21day = (row.overdue_rate_21day * 100).toFixed(2) + '%'
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
    func.connPool1(sql.dataAnalysis.selectAll, [tableName.dailyRepaymentAmountData, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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
    func.connPool1(sql.dataAnalysis.getCount, [tableName.dailyRepaymentAmountData, params.startTime, params.endTime], function (err, rs) {
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
    if (global.dailyRepaymentAmountCount === 0) {
      global.dailyRepaymentAmountCount++
      process.exec(shell.dailyRepaymentAmountData, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error)
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 每日还款金额数据shell脚本执行失败')
          res.json({code: '500'})
          global.dailyRepaymentAmountCount = 0
        } else {
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 每日还款金额数据shell脚本执行成功')
          res.json({code: '200'})
          global.dailyRepaymentAmountCount = 0
        }
      })
      console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 每日还款金额数据开始执行shell脚本')
    } else {
      res.json({code: '400'})
    }
  }
}
