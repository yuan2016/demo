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
    if (row.Pass_rate) {
      row.Pass_rate = (row.Pass_rate * 100).toFixed(2) + '%'
    }

    if (row.register_num) {
      row.register_num = formatCurrency(row.register_num)
    }
    if (row.realname_auth_num) {
      row.realname_auth_num = formatCurrency(row.realname_auth_num)
    }
    if (row.card_bound_num) {
      row.card_bound_num = formatCurrency(row.card_bound_num)
    }
    if (row.emergency_contact_num) {
      row.emergency_contact_num = formatCurrency(row.emergency_contact_num)
    }
    if (row.operator_auth_num) {
      row.operator_auth_num = formatCurrency(row.operator_auth_num)
    }
    if (row.Alipay_auth_num) {
      row.Alipay_auth_num = formatCurrency(row.Alipay_auth_num)
    }
    if (row.Sesame_auth_num) {
      row.Sesame_auth_num = formatCurrency(row.Sesame_auth_num)
    }
    if (row.jobinfo_auth_num) {
      row.jobinfo_auth_num = formatCurrency(row.jobinfo_auth_num)
    }
    if (row.apply_loan_num) {
      row.apply_loan_num = formatCurrency(row.apply_loan_num)
    }
    if (row.apply_succ_num) {
      row.apply_succ_num = formatCurrency(row.apply_succ_num)
    }
    if (row.loan_amount) {
      row.loan_amount = formatCurrency(row.loan_amount)
    }
    if (row.blacklist_num) {
      row.blacklist_num = formatCurrency(row.blacklist_num)
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
    if (params.province === '全国') {
      params.province = ''
    }
    if (params.city === '全国' || params.city === '全部') {
      params.city = ''
    }
    let queries = analysis(params)
    let query = sql.promotionManagement.promotionCommon.selectAllFront + queries.slice(0, 2).join(' and ') + sql.promotionManagement.promotionCommon.selectAllBack
    func.connPool1(query, [tableName.promotionRegionStatistics, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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
    func.connPool1(sql.promotionManagement.promotionCommon.getCount, [tableName.promotionRegionStatistics, params.startTime, params.endTime], function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
        throw new Error(err)
      }
      res.json(rs)
    })
  }
}