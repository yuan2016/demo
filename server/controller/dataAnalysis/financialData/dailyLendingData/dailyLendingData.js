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
    if (row.create_time) {
      row.create_time = moment(row.create_time).format('YYYY-MM-DD hh:mm:ss')
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
        throw new Error(err)
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
        throw new Error(err)
      }
      res.json(rs)
    })
  }
}
