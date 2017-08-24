let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let moment = require('moment')
let tableName = require('../../../../config/tableName')
let {formatCurrency} = require('../../../../utils/utils')
let shell = require('../../../../config/shell')
let process = require('child_process')

global.fundProductCount = 0

function formatData (rows) {
  return rows.map(row => {
    if (row.UPDATE_TIME) {
      row.UPDATE_TIME = moment(row.UPDATE_TIME).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.D_DATE) {
      row.D_DATE = moment(row.D_DATE).format('YYYY-MM-DD')
    }
    if (row.REPAYMENT_RATIO_14) {
      row.REPAYMENT_RATIO_14 = (row.REPAYMENT_RATIO_14 * 100).toFixed(2) + '%'
    }
    if (row.REPAYMENT_RATIO_21F) {
      row.REPAYMENT_RATIO_21F = (row.REPAYMENT_RATIO_21F * 100).toFixed(2) + '%'
    }
    if (row.REPAYMENT_RATIO_90F) {
      row.REPAYMENT_RATIO_90F = (row.REPAYMENT_RATIO_90F * 100).toFixed(2) + '%'
    }
    if (row.RENEWAL_RATIO_14) {
      row.RENEWAL_RATIO_14 = (row.RENEWAL_RATIO_14 * 100).toFixed(2) + '%'
    }
    if (row.OVERDUE_PROPORTION_14) {
      row.OVERDUE_PROPORTION_14 = (row.OVERDUE_PROPORTION_14 * 100).toFixed(2) + '%'
    }
    if (row.OVERDUE_PROPORTION_21F) {
      row.OVERDUE_PROPORTION_21F = (row.OVERDUE_PROPORTION_21F * 100).toFixed(2) + '%'
    }
    if (row.OVERDUE_PROPORTION_90F) {
      row.OVERDUE_PROPORTION_90F = (row.OVERDUE_PROPORTION_90F * 100).toFixed(2) + '%'
    }

    if (row.TOTAL_AMOUNT_14) {
      row.TOTAL_AMOUNT_14 = formatCurrency(row.TOTAL_AMOUNT_14)
    }
    if (row.TOTAL_AMOUNT_21F) {
      row.TOTAL_AMOUNT_21F = formatCurrency(row.TOTAL_AMOUNT_21F)
    }
    if (row.TOTAL_AMOUNT_90F) {
      row.TOTAL_AMOUNT_90F = formatCurrency(row.TOTAL_AMOUNT_90F)
    }
    if (row.ACTUAL_REPAYMENT_AMOUNT_14) {
      row.ACTUAL_REPAYMENT_AMOUNT_14 = formatCurrency(row.ACTUAL_REPAYMENT_AMOUNT_14)
    }
    if (row.ACTUAL_REPAYMENT_AMOUNT_21F) {
      row.ACTUAL_REPAYMENT_AMOUNT_21F = formatCurrency(row.ACTUAL_REPAYMENT_AMOUNT_21F)
    }
    if (row.ACTUAL_REPAYMENT_AMOUNT_90F) {
      row.ACTUAL_REPAYMENT_AMOUNT_90F = formatCurrency(row.ACTUAL_REPAYMENT_AMOUNT_90F)
    }
    if (row.RENEWAL_AMOUNT_14) {
      row.RENEWAL_AMOUNT_14 = formatCurrency(row.RENEWAL_AMOUNT_14)
    }
    if (row.RENEWAL_COMMISSION_14) {
      row.RENEWAL_COMMISSION_14 = formatCurrency(row.RENEWAL_COMMISSION_14)
    }
    if (row.OVERDUE_AMOUNT_14) {
      row.OVERDUE_AMOUNT_14 = formatCurrency(row.OVERDUE_AMOUNT_14)
    }
    if (row.OVERDUE_AMOUNT_21F) {
      row.OVERDUE_AMOUNT_21F = formatCurrency(row.OVERDUE_AMOUNT_21F)
    }
    if (row.OVERDUE_AMOUNT_90F) {
      row.OVERDUE_AMOUNT_90F = formatCurrency(row.OVERDUE_AMOUNT_90F)
    }
    if (row.OVERDUE_PAYMENT_AMOUNT_14) {
      row.OVERDUE_PAYMENT_AMOUNT_14 = formatCurrency(row.OVERDUE_PAYMENT_AMOUNT_14)
    }
    if (row.OVERDUE_PAYMENT_AMOUNT_21F) {
      row.OVERDUE_PAYMENT_AMOUNT_21F = formatCurrency(row.OVERDUE_PAYMENT_AMOUNT_21F)
    }
    if (row.OVERDUE_PAYMENT_AMOUNT_90F) {
      row.OVERDUE_PAYMENT_AMOUNT_90F = formatCurrency(row.OVERDUE_PAYMENT_AMOUNT_90F)
    }
    if (row.LATE_FEES_INCOME_14) {
      row.LATE_FEES_INCOME_14 = formatCurrency(row.LATE_FEES_INCOME_14)
    }
    if (row.LATE_FEES_INCOME_21F) {
      row.LATE_FEES_INCOME_21F = formatCurrency(row.LATE_FEES_INCOME_21F)
    }
    if (row.LATE_FEES_INCOME_90F) {
      row.LATE_FEES_INCOME_90F = formatCurrency(row.LATE_FEES_INCOME_90F)
    }
    if (row.COMP_SERVICE_INCOME_14) {
      row.COMP_SERVICE_INCOME_14 = formatCurrency(row.COMP_SERVICE_INCOME_14)
    }
    if (row.COMP_SERVICE_INCOME_21F) {
      row.COMP_SERVICE_INCOME_21F = formatCurrency(row.COMP_SERVICE_INCOME_21F)
    }
    if (row.COMP_SERVICE_INCOME_90F) {
      row.COMP_SERVICE_INCOME_90F = formatCurrency(row.COMP_SERVICE_INCOME_90F)
    }
    if (row.SERVICE_CHARGE_14) {
      row.SERVICE_CHARGE_14 = formatCurrency(row.SERVICE_CHARGE_14)
    }
    if (row.SERVICE_CHARGE_21F) {
      row.SERVICE_CHARGE_21F = formatCurrency(row.SERVICE_CHARGE_21F)
    }

    if (row.SERVICE_CHARGE_90F) {
      row.SERVICE_CHARGE_90F = formatCurrency(row.SERVICE_CHARGE_90F)
    }
    if (row.EQUAL_AMOUNT_INCOME_14) {
      row.EQUAL_AMOUNT_INCOME_14 = formatCurrency(row.EQUAL_AMOUNT_INCOME_14)
    }
    if (row.EQUAL_AMOUNT_INCOME_21F) {
      row.EQUAL_AMOUNT_INCOME_21F = formatCurrency(row.EQUAL_AMOUNT_INCOME_21F)
    }
    if (row.EQUAL_AMOUNT_INCOME_90F) {
      row.EQUAL_AMOUNT_INCOME_90F = formatCurrency(row.EQUAL_AMOUNT_INCOME_90F)
    }
    if (row.CAPITAL_SURPLUS_14) {
      row.CAPITAL_SURPLUS_14 = formatCurrency(row.CAPITAL_SURPLUS_14)
    }
    if (row.CAPITAL_SURPLUS_21F) {
      row.CAPITAL_SURPLUS_21F = formatCurrency(row.CAPITAL_SURPLUS_21F)
    }
    if (row.CAPITAL_SURPLUS_90F) {
      row.CAPITAL_SURPLUS_90F = formatCurrency(row.CAPITAL_SURPLUS_90F)
    }
    return row
  })
}

module.exports = {
  //每日还款金额数据
  fetchAll (req, res) {
    let params = req.body
    func.connPool1(sql.dataAnalysis.selectAll, [tableName.fundAnalysisProduct, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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
    func.connPool1(sql.dataAnalysis.getCount, [tableName.fundAnalysisProduct, params.startTime, params.endTime], function (err, rs) {
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
    if (global.fundProductCount === 0) {
      global.fundProductCount++
      process.exec(shell.fundAnalysisProduct, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error)
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 资金分析(分产品)shell脚本执行失败')
          res.json({code: '500'})
          global.fundProductCount = 0
        } else {
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 资金分析(分产品)shell脚本执行成功')
          res.json({code: '200'})
          global.fundProductCount = 0
        }
      })
      console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 资金分析(分产品)开始执行shell脚本')
    } else {
      res.json({code: '400'})
    }
  }
}
