let sql = require('../../sql/sqlMap')
let func = require('../../sql/func')
let tableName = require('../../config/tableName')
let {formatCurrency} = require('../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.total_user_num) {
      row.total_user_num = formatCurrency(row.total_user_num)
    }
    if (row.all_fact_authuser_num) {
      row.all_fact_authuser_num = formatCurrency(row.all_fact_authuser_num)
    }
    if (row.card_bounduser_num) {
      row.card_bounduser_num = formatCurrency(row.card_bounduser_num)
    }
    if (row.total_operauth_num) {
      row.total_operauth_num = formatCurrency(row.total_operauth_num)
    }
    if (row.today_registuser_num) {
      row.today_registuser_num = formatCurrency(row.today_registuser_num)
    }
    if (row.total_realnameauth_num) {
      row.total_realnameauth_num = formatCurrency(row.total_realnameauth_num)
    }
    if (row.total_Sesameauth_num) {
      row.total_Sesameauth_num = formatCurrency(row.total_Sesameauth_num)
    }
    if (row.total_emergcontact_num) {
      row.total_emergcontact_num = formatCurrency(row.total_emergcontact_num)
    }
    if (row.accu_loan_amount) {
      row.accu_loan_amount = formatCurrency(row.accu_loan_amount)
    }
    if (row.today_loan_amount) {
      row.today_loan_amount = formatCurrency(row.today_loan_amount)
    }
    if (row.total_inloan_amount) {
      row.total_inloan_amount = formatCurrency(row.total_inloan_amount)
    }
    if (row.Loanfail_amount) {
      row.Loanfail_amount = formatCurrency(row.Loanfail_amount)
    }
    if (row.accu_loan_num) {
      row.accu_loan_num = formatCurrency(row.accu_loan_num)
    }
    if (row.today_loan_num) {
      row.today_loan_num = formatCurrency(row.today_loan_num)
    }
    if (row.total_inloan_num) {
      row.total_inloan_num = formatCurrency(row.total_inloan_num)
    }
    if (row.Loanfail_num) {
      row.Loanfail_num = formatCurrency(row.Loanfail_num)
    }
    if (row.accu_machinetrial_order) {
      row.accu_machinetrial_order = formatCurrency(row.accu_machinetrial_order)
    }
    if (row.today_machinetrial_order) {
      row.today_machinetrial_order = formatCurrency(row.today_machinetrial_order)
    }
    if (row.today_olduser_trial) {
      row.today_olduser_trial = formatCurrency(row.today_olduser_trial)
    }
    if (row.today_newuser_trial) {
      row.today_newuser_trial = formatCurrency(row.today_newuser_trial)
    }
    if (row.Pendingtrial_user_num) {
      row.Pendingtrial_user_num = formatCurrency(row.Pendingtrial_user_num)
    }
    if (row.accu_passmachtrial_order) {
      row.accu_passmachtrial_order = formatCurrency(row.accu_passmachtrial_order)
    }
    if (row.today_passmachtrial_order) {
      row.today_passmachtrial_order = formatCurrency(row.today_passmachtrial_order)
    }
    if (row.today_ouserpass_num) {
      row.today_ouserpass_num = formatCurrency(row.today_ouserpass_num)
    }
    if (row.today_nuserpass_num) {
      row.today_nuserpass_num = formatCurrency(row.Pendingtrial_order_num)
    }
    if (row.due_amount_f1) {
      row.due_amount_f1 = formatCurrency(row.due_amount_f1)
    }

    if (row.passmachtrial_order_rate) {
      row.passmachtrial_order_rate = (row.passmachtrial_order_rate * 100).toFixed(2)
    }
    if (row.today_passmachtrial_rate) {
      row.today_passmachtrial_rate = (row.today_passmachtrial_rate * 100).toFixed(2)
    }
    if (row.today_ouserpass_rate) {
      row.today_ouserpass_rate = (row.today_ouserpass_rate * 100).toFixed(2)
    }
    if (row.today_nuserpass_rate) {
      row.today_nuserpass_rate = (row.today_nuserpass_rate * 100).toFixed(2)
    }
  })
}

module.exports = {
  //首页
  fetchAll (req, res) {
    func.connPool1(sql.main.selectAll, tableName.main, function (err, rs) {
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
      formatData(rs)
      res.json(rs)
    })
  }
}
