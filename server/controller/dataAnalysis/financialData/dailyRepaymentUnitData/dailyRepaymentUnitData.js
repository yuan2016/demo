let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let moment = require('moment')
let tableName = require('../../../../config/tableName')
let {formatCurrency} = require('../../../../utils/utils')
let shell = require('../../../../config/shell')
let process = require('child_process')

global.dailyRepaymentUnitCount = 0

function formatData (rows) {
  return rows.map(row => {
    if (row.d_date) {
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
    func.connPool1(sql.dataAnalysis.getCount, [tableName.dailyRepaymentUnitData, params.startTime, params.endTime], function (err, rs) {
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
    if (global.dailyRepaymentUnitCount === 0) {
      global.dailyRepaymentUnitCount++
      process.exec(shell.dailyRepaymentUnitData, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error)
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 每日还款单位数据shell脚本执行失败')
          res.json({code: '500'})
          global.dailyRepaymentUnitCount = 0
        } else {
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 每日还款单位数据shell脚本执行成功')
          res.json({code: '200'})
          global.dailyRepaymentUnitCount = 0
        }
      })
      console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 每日还款单位数据开始执行shell脚本')
    } else {
      res.json({code: '400'})
    }
  }
}
