let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')
let {analysis, formatCurrency, formatInt} = require('../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.Pass_rate) {
      row.Pass_rate = (row.Pass_rate * 100).toFixed(2) + '%'
    }

    if (row.register_num) {
      row.register_num = formatInt(row.register_num)
    }
    if (row.realname_auth_num) {
      row.realname_auth_num = formatInt(row.realname_auth_num)
    }
    if (row.card_bound_num) {
      row.card_bound_num = formatInt(row.card_bound_num)
    }
    if (row.emergency_contact_num) {
      row.emergency_contact_num = formatInt(row.emergency_contact_num)
    }
    if (row.operator_auth_num) {
      row.operator_auth_num = formatInt(row.operator_auth_num)
    }
    if (row.Alipay_auth_num) {
      row.Alipay_auth_num = formatInt(row.Alipay_auth_num)
    }
    if (row.Sesame_auth_num) {
      row.Sesame_auth_num = formatInt(row.Sesame_auth_num)
    }
    if (row.jobinfo_auth_num) {
      row.jobinfo_auth_num = formatInt(row.jobinfo_auth_num)
    }
    if (row.blacklist_num) {
      row.blacklist_num = formatInt(row.blacklist_num)
    }
    if (row.apply_loan_num) {
      row.apply_loan_num = formatInt(row.apply_loan_num)
    }
    if (row.apply_succ_num) {
      row.apply_succ_num = formatInt(row.apply_succ_num)
    }
    if (row.loan_amount) {
      row.loan_amount = formatCurrency(row.loan_amount)
    }
    if (row.overdue_num) {
      row.overdue_num = formatInt(row.overdue_num)
    }
    return row
  })
}

function packageRows (rows) {
  let options = [{value: '', label: '不限'}]
  for (let row of rows) {
    let option = {}
    if (row.channel_trader && row.channel_trader !== '') {
      option.value = row.channel_trader
      option.label = row.channel_trader
      options.push(option)
    }
  }
  return options
}

module.exports = {
  //渠道统计汇总
  fetchAll (req, res) {
    let params = req.body
    let queries = analysis(params)
    let order = ''
    if (params.order) {
      order = params.order
    }
    let query = sql.promotionManagement.channelStatisticsSummary.selectAllFront + queries.slice(0, 1).join(' and ') + order + sql.promotionManagement.channelStatisticsSummary.selectAllBack
    func.connPool1(query, [tableName.channelStatisticsSummary, params.offset, params.limit], function (err, rs) {
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
  //渠道统计汇总总条数
  getCount (req, res) {
    let params = req.body
    let queries = analysis(params)
    let query = sql.promotionManagement.channelStatisticsSummary.getCount + queries.slice(0, 1).join(' and ')
    func.connPool1(query, tableName.channelStatisticsSummary, function (err, rs) {
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
  getSelectOptions (req, res) {
    func.connPool1(sql.promotionManagement.channelStatisticsSummary.getSelectOptions, tableName.channelStatisticsSummary, function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
      }
      rs = packageRows(rs)
      res.json(rs)
    })
  }
}
