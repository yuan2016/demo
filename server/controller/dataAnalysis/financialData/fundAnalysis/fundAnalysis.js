let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let moment = require('moment')
let tableName = require('../../../../config/tableName')
let {formatCurrency} = require('../../../../utils/utils')
let shell = require('../../../../config/shell')
let process = require('child_process')

global.fundCount = 0

function formatData (rows) {
  return rows.map(row => {
    if (row.create_time) {
      row.create_time = moment(row.create_time).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.d_date) {
      row.d_date = moment(row.d_date).format('YYYY-MM-DD')
    }
    if (row.repayment_ratio) {
      row.repayment_ratio = (row.repayment_ratio * 100).toFixed(2) + '%'
    }
    if (row.renewal_ratio) {
      row.renewal_ratio = (row.renewal_ratio * 100).toFixed(2) + '%'
    }
    if (row.overdue_proportion) {
      row.overdue_proportion = (row.overdue_proportion * 100).toFixed(2) + '%'
    }

    if (row.total_amount) {
      row.total_amount = formatCurrency(row.total_amount)
    }
    if (row.actual_repayment_amount) {
      row.actual_repayment_amount = formatCurrency(row.actual_repayment_amount)
    }
    if (row.renewal_amount) {
      row.renewal_amount = formatCurrency(row.renewal_amount)
    }
    if (row.renewal_commission) {
      row.renewal_commission = formatCurrency(row.renewal_commission)
    }
    if (row.overdue_amount) {
      row.overdue_amount = formatCurrency(row.overdue_amount)
    }
    if (row.overdue_payment_amount) {
      row.overdue_payment_amount = formatCurrency(row.overdue_payment_amount)
    }
    if (row.late_fees_income) {
      row.late_fees_income = formatCurrency(row.late_fees_income)
    }
    if (row.comp_service_income) {
      row.comp_service_income = formatCurrency(row.comp_service_income)
    }
    if (row.service_charge) {
      row.service_charge = formatCurrency(row.service_charge)
    }
    if (row.equal_amount_income) {
      row.equal_amount_income = formatCurrency(row.equal_amount_income)
    }
    if (row.capital_surplus) {
      row.capital_surplus = formatCurrency(row.capital_surplus)
    }
    return row
  })
}

module.exports = {
  //每日还款金额数据
  fetchAll (req, res) {
    let params = req.body
    func.connPool1(sql.dataAnalysis.selectAll, [tableName.fundAnalysis, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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
    func.connPool1(sql.dataAnalysis.getCount, [tableName.fundAnalysis, params.startTime, params.endTime], function (err, rs) {
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
    if (global.fundCount === 0) {
      global.fundCount++
      process.exec(shell.fundAnalysis, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error)
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 资金分析shell脚本执行失败')
          res.json({code: '500'})
          global.fundCount = 0
        } else {
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 资金分析shell脚本执行成功')
          res.json({code: '200'})
          global.fundCount = 0
        }
      })
      console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 资金分析开始执行shell脚本')
    } else {
      res.json({code: '400'})
    }
  }
}
