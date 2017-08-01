let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')
let {analysis, formatCurrency} = require('../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.d_date) {
      row.d_date = moment(row.d_date).format('YYYY-MM-DD')
    }
    if (row.create_time) {
      row.create_time = moment(row.create_time).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.nuser_loan_ratio) {
      row.nuser_loan_ratio = (row.nuser_loan_ratio * 100).toFixed(2) + '%'
    }
    if (row.nuser_adoption_rate) {
      row.nuser_adoption_rate = (row.nuser_adoption_rate * 100).toFixed(2) + '%'
    }
    if (row.ouser_adoption_rate) {
      row.ouser_adoption_rate = (row.ouser_adoption_rate * 100).toFixed(2) + '%'
    }

    if (row.effe_cust_acqu_cost) {
      row.effe_cust_acqu_cost = formatCurrency(row.effe_cust_acqu_cost)
    }
    if (row.day_consumption) {
      row.day_consumption = formatCurrency(row.day_consumption)
    }
    if (row.register_num) {
      row.register_num = formatCurrency(row.register_num)
    }
    if (row.all_fact_auth_num) {
      row.all_fact_auth_num = formatCurrency(row.all_fact_auth_num)
    }
    if (row.apply_loan_num) {
      row.apply_loan_num = formatCurrency(row.apply_loan_num)
    }
    if (row.blacklist_num) {
      row.blacklist_num = formatCurrency(row.blacklist_num)
    }
    if (row.entries_num) {
      row.entries_num = formatCurrency(row.entries_num)
    }
    if (row.nuser_apply_succ_num) {
      row.nuser_apply_succ_num = formatCurrency(row.nuser_apply_succ_num)
    }
    if (row.ouser_apply_succ_num) {
      row.ouser_apply_succ_num = formatCurrency(row.ouser_apply_succ_num)
    }
    if (row.nuser_loan_amount) {
      row.nuser_loan_amount = formatCurrency(row.nuser_loan_amount)
    }
    if (row.ouser_loan_amount) {
      row.ouser_loan_amount = formatCurrency(row.ouser_loan_amount)
    }
    if (row.overdue_num) {
      row.overdue_num = formatCurrency(row.overdue_num)
    }
    return row
  })
}

module.exports = {
  //每日还款金额数据
  fetchAll (req, res) {
    let params = req.body
    let queries = analysis(params)
    let query = sql.promotionManagement.promotionChannelStatistics.selectAllFront + queries.slice(0, 2).join(' and ') + sql.promotionManagement.promotionChannelStatistics.selectAllBack
    func.connPool1(query, [tableName.promotionChannelStatistics, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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
    let queries = analysis(params)
    let query = sql.promotionManagement.promotionChannelStatistics.getCount + queries.slice(0, 2).join(' and ')
    func.connPool1(query, [tableName.promotionChannelStatistics, params.startTime, params.endTime], function (err, rs) {
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
  }
}
