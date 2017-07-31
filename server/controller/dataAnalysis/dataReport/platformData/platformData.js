let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let moment = require('moment')
let tableName = require('../../../../config/tableName')
let {formatCurrency} = require('../../../../utils/utils')

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
      row.register_num = formatCurrency(row.register_num)
    }
    if (row.realname_auth_num) {
      row.realname_auth_num = formatCurrency(row.realname_auth_num)
    }
    if (row.realname_auth_freq) {
      row.realname_auth_freq = formatCurrency(row.realname_auth_freq)
    }
    if (row.realname_fee) {
      row.realname_fee = formatCurrency(row.realname_fee)
    }
    if (row.operator_auth_num) {
      row.operator_auth_num = formatCurrency(row.operator_auth_num)
    }
    if (row.generate_report_num) {
      row.generate_report_num = formatCurrency(row.generate_report_num)
    }
    if (row.operator_fee) {
      row.operator_fee = formatCurrency(row.operator_fee)
    }
    if (row.card_bound_num) {
      row.card_bound_num = formatCurrency(row.card_bound_num)
    }
    if (row.Sesame_auth_num) {
      row.Sesame_auth_num = formatCurrency(row.Sesame_auth_num)
    }
    if (row.Sesame_auth_fee) {
      row.Sesame_auth_fee = formatCurrency(row.Sesame_auth_fee)
    }
    if (row.auth_work_num) {
      row.auth_work_num = formatCurrency(row.auth_work_num)
    }
    if (row.Alipay_auth_num) {
      row.Alipay_auth_num = formatCurrency(row.Alipay_auth_num)
    }
    if (row.total_apply_loan_num) {
      row.total_apply_loan_num = formatCurrency(row.total_apply_loan_num)
    }
    if (row.total_audit_num) {
      row.total_audit_num = formatCurrency(row.total_audit_num)
    }
    if (row.total_payloans_amount) {
      row.total_payloans_amount = formatCurrency(row.total_payloans_amount)
    }
    if (row.total_succloan_amount) {
      row.total_succloan_amount = formatCurrency(row.total_succloan_amount)
    }
    if (row.succ_loan_num) {
      row.succ_loan_num = formatCurrency(row.succ_loan_num)
    }
    if (row.outstand_num) {
      row.outstand_num = formatCurrency(row.outstand_num)
    }
    if (row.total_failsingular_num) {
      row.total_failsingular_num = formatCurrency(row.total_failsingular_num)
    }
    if (row.total_passuser_num) {
      row.total_passuser_num = formatCurrency(row.total_passuser_num)
    }
    if (row.counter_fraud_num) {
      row.counter_fraud_num = formatCurrency(row.counter_fraud_num)
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
        res.json({
          code: '404'
        })
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
        res.json({
          code: '404'
        })
        return
      }
      res.json(rs)
    })
  }
}
