let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let moment = require('moment')
let tableName = require('../../../../config/tableName')
let {formatCurrency, formatInt} = require('../../../../utils/utils')
let process = require('child_process')
let shell = require('../../../../config/shell')

global.platformCount = 0

function formatData (rows) {
  return rows.map(row => {
    if (row.d_date) {
      row.d_date = moment(row.d_date).format('YYYY-MM-DD')
    }
    if (row.passuser_rate) {
      row.passuser_rate = (row.passuser_rate * 100).toFixed(2) + '%'
    }
    if (row.Order_through_rate) {
      row.Order_through_rate = (row.Order_through_rate * 100).toFixed(2) + '%'
    }

    if (row.register_num) {
      row.register_num = formatInt(row.register_num)
    }
    if (row.realname_auth_num) {
      row.realname_auth_num = formatInt(row.realname_auth_num)
    }
    if (row.realname_auth_freq) {
      row.realname_auth_freq = formatInt(row.realname_auth_freq)
    }
    if (row.realname_fee) {
      row.realname_fee = formatCurrency(row.realname_fee)
    }
    if (row.operator_auth_num) {
      row.operator_auth_num = formatInt(row.operator_auth_num)
    }
    if (row.generate_report_num) {
      row.generate_report_num = formatInt(row.generate_report_num)
    }
    if (row.operator_fee) {
      row.operator_fee = formatCurrency(row.operator_fee)
    }
    if (row.card_bound_num) {
      row.card_bound_num = formatInt(row.card_bound_num)
    }
    if (row.Sesame_auth_num) {
      row.Sesame_auth_num = formatInt(row.Sesame_auth_num)
    }
    if (row.Sesame_auth_fee) {
      row.Sesame_auth_fee = formatCurrency(row.Sesame_auth_fee)
    }
    if (row.auth_work_num) {
      row.auth_work_num = formatInt(row.auth_work_num)
    }
    if (row.Alipay_auth_num) {
      row.Alipay_auth_num = formatInt(row.Alipay_auth_num)
    }
    if (row.total_apply_loan_num) {
      row.total_apply_loan_num = formatInt(row.total_apply_loan_num)
    }
    if (row.total_audit_num) {
      row.total_audit_num = formatInt(row.total_audit_num)
    }
    if (row.total_payloans_amount) {
      row.total_payloans_amount = formatCurrency(row.total_payloans_amount)
    }
    if (row.total_succloan_amount) {
      row.total_succloan_amount = formatCurrency(row.total_succloan_amount)
    }
    if (row.succ_loan_num) {
      row.succ_loan_num = formatInt(row.succ_loan_num)
    }
    if (row.outstand_num) {
      row.outstand_num = formatInt(row.outstand_num)
    }
    if (row.total_failsingular_num) {
      row.total_failsingular_num = formatInt(row.total_failsingular_num)
    }
    if (row.total_passuser_num) {
      row.total_passuser_num = formatInt(row.total_passuser_num)
    }
    if (row.counter_fraud_num) {
      row.counter_fraud_num = formatInt(row.counter_fraud_num)
    }
    return row
  })
}

module.exports = {
  //每日还款金额数据
  fetchAll (req, res) {
    let params = req.body
    func.connPool1(sql.dataAnalysis.selectAll, [tableName.platformData, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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
    func.connPool1(sql.dataAnalysis.getCount, [tableName.platformData, params.startTime, params.endTime], function (err, rs) {
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
    if (global.platformCount === 0) {
      global.platformCount++
      process.exec(shell.platformData, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error)
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 平台数据shell脚本执行失败')
          res.json({code: '500'})
          global.platformCount = 0
        } else {
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 平台数据shell脚本执行成功')
          res.json({code: '200'})
          global.platformCount = 0
        }
      })
      console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 平台数据开始执行shell脚本')
    } else {
      res.json({code: '400'})
    }
  }
}
