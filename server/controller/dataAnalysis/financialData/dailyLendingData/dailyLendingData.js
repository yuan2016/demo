let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let moment = require('moment')
let tableName = require('../../../../config/tableName')
let {formatCurrency} = require('../../../../utils/utils')
let process = require('child_process')
let shell = require('../../../../config/shell')

global.dailyLendingCount = 0

function formatData (rows) {
  return rows.map(row => {
    if (row.d_date) {
      row.d_date = moment(row.d_date).format('YYYY-MM-DD')
    }
    if (row.create_time) {
      row.create_time = moment(row.create_time).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.loans_total) {
      row.loans_total = formatCurrency(row.loans_total)
    }
    if (row.loans_total_7day) {
      row.loans_total_7day = formatCurrency(row.loans_total_7day)
    }
    if (row.loans_total_14day) {
      row.loans_total_14day = formatCurrency(row.loans_total_14day)
    }
    if (row.loans_total_21day) {
      row.loans_total_21day = formatCurrency(row.loans_total_21day)
    }
    if (row.loans_total_f_21day) {
      row.loans_total_f_21day = formatCurrency(row.loans_total_f_21day)
    }
    if (row.loans_total_ouser) {
      row.loans_total_ouser = formatCurrency(row.loans_total_ouser)
    }
    if (row.loans_total_nuser) {
      row.loans_total_nuser = formatCurrency(row.loans_total_nuser)
    }

    if (row.register_num) {
      row.register_num = formatCurrency(row.register_num)
    }
    if (row.loan_num) {
      row.loan_num = formatCurrency(row.loan_num)
    }
    if (row.success_loan_num) {
      row.success_loan_num = formatCurrency(row.success_loan_num)
    }
    if (row.loan_singular) {
      row.loan_singular = formatCurrency(row.loan_singular)
    }
    if (row.loan_singular_7day) {
      row.loan_singular_7day = formatCurrency(row.loan_singular_7day)
    }
    if (row.loan_singular_14day) {
      row.loan_singular_14day = formatCurrency(row.loan_singular_14day)
    }
    if (row.loan_singular_21day) {
      row.loan_singular_21day = formatCurrency(row.loan_singular_21day)
    }
    if (row.loan_singular_f_21day) {
      row.loan_singular_f_21day = formatCurrency(row.loan_singular_f_21day)
    }
    if (row.loan_singular_ouser) {
      row.loan_singular_ouser = formatCurrency(row.loan_singular_ouser)
    }
    if (row.loan_singular_nuser) {
      row.loan_singular_nuser = formatCurrency(row.loan_singular_nuser)
    }
    if (row.loans_total_t_21day) {
      row.loans_total_t_21day = formatCurrency(row.loans_total_t_21day)
    }
    if (row.loans_total_90day) {
      row.loans_total_90day = formatCurrency(row.loans_total_90day)
    }
    if (row.loan_singular_t_21day) {
      row.loan_singular_t_21day = formatCurrency(row.loan_singular_t_21day)
    }
    if (row.loan_singular_90day) {
      row.loan_singular_90day = formatCurrency(row.loan_singular_90day)
    }

    if (row.CHARGEBACK_FAILRATE) {
      row.CHARGEBACK_FAILRATE = (row.CHARGEBACK_FAILRATE * 100).toFixed(2) + '%'
    }
    if (row.newuser_loan_rate) {
      row.newuser_loan_rate = (row.newuser_loan_rate * 100).toFixed(2) + '%'
    }
    if (row.olduser_loan_rate) {
      row.olduser_loan_rate = (row.olduser_loan_rate * 100).toFixed(2) + '%'
    }
    return row
  })
}

module.exports = {
  //每日还款金额数据
  fetchAll (req, res) {
    let params = req.body
    func.connPool1(sql.dataAnalysis.selectAll, [tableName.dailyLendingData, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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
    func.connPool1(sql.dataAnalysis.getCount, [tableName.dailyLendingData, params.startTime, params.endTime], function (err, rs) {
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
    if (global.dailyLendingCount === 0) {
      global.dailyLendingCount++
      process.exec(shell.dailyLendingData, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error)
          console.log('exec error: ' + error.message)
          console.log('exec error: ' + error.stack)
          console.log('exec error: ' + error.code)
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 每日放款数据shell脚本执行失败')
          res.json({code: '500'})
          global.dailyLendingCount = 0
        } else {
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 每日放款数据shell脚本执行成功')
          res.json({code: '200'})
          global.dailyLendingCount = 0
        }
      })
      console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 每日放款数据开始执行shell脚本')
    } else {
      res.json({code: '400'})
    }
  }
}
