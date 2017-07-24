let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')
let {analysis, formatCurrency} = require('../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.last_apply_at) {
      row.last_apply_at = moment(row.last_apply_at).format('YYYY-MM-DD')
    }
    if (row.create_at) {
      row.create_at = moment(row.create_at).format('YYYY-MM-DD')
    }
    if (row.updated_at) {
      row.updated_at = moment(row.updated_at).format('YYYY-MM-DD')
    }
    if (row.add_amount) {
      row.add_amount = formatCurrency(row.add_amount / 100)
    }
    if (row.new_amount_max) {
      row.new_amount_max = formatCurrency(row.new_amount_max / 100)
    }
    if (row.repayment_norm_amount) {
      row.repayment_norm_amount = formatCurrency(row.repayment_norm_amount / 100)
    }
    if (row.repayment_succ_amount) {
      row.repayment_succ_amount = formatCurrency(row.repayment_succ_amount / 100)
    }
    return row
  })
}

module.exports = {
  //用户通讯录数据
  fetchAll (req, res) {
    let params = req.body
    let queries = analysis(params)
    let query = sql.loanManagement.raiseQuotaRecord.selectAllFront + queries.slice(0, 3).join(' and ') + sql.loanManagement.raiseQuotaRecord.selectAllBack
    func.connPool2(query, [tableName.raiseQuotaRecord, params.offset, params.limit], function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
        throw new Error(err)
      }
      rs = formatData(rs)
      res.json(rs)
    })
  }
  //用户通讯录总条数
  /*  getCount (req, res) {
   let params = req.body
   let queries = analysis(params)
   let query = sql.userInformationManagement.userNameAuthenticationList.getCount + queries.slice(0, 3).join(' and ')
   func.connPool2(query, tableName.userNameAuthenticationList, function (err, rs) {
   if (err) {
   console.log('[query] - :' + err)
   throw new Error(err)
   }
   res.json(rs)
   })
   }*/
}
/**
 * Created by Administrator on 2017/7/10.
 */
