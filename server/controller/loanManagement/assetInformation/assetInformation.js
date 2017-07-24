/**
 * Created by Administrator on 2017/7/12.
 */
let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')
let {analysis, mosaic, formatCurrency} = require('../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.order_time) {
      row.order_time = moment(row.order_time).format('YYYY-MM-DD')
    }
    if (row.loan_time) {
      row.loan_time = moment(row.loan_time).format('YYYY-MM-DD')
    }
    if (row.updated_at) {
      row.updated_at = moment(row.updated_at).format('YYYY-MM-DD')
    }
    if (row.credit_lv && (row.credit_lv !== '未知')) {
      row.credit_lv = row.credit_lv + '类'
    }
    if (row.money_amount) {
      row.money_amount = formatCurrency(row.money_amount)
    }
    if (row.apr) {
      row.apr = formatCurrency(row.apr)
    }
    if (row.loan_interests) {
      row.loan_interests = formatCurrency(row.loan_interests)
    }
    row.assets_owned = '招财猫'
    return row
  })
}

module.exports = {

  //用户通讯录数据
  fetchAll (req, res) {
    let params = req.body
    let queries = analysis(params, 't')
    let querySpecial = mosaic(params, 'credit_lv', 't1')
    let query = sql.loanManagement.assetInformation.selectAllFront + queries.slice(0, 3).join(' and ') + querySpecial + sql.loanManagement.assetInformation.selectAllBack
    func.connPool2(query, [tableName.assetInformation.t, tableName.assetInformation.t1, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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
   let query = sql.userInformationManagement.userAddressBook.getCount + queries.slice(0, 3).join(' and ')
   func.connPool2(query, tableName.userAddressBook, function (err, rs) {
   if (err) {
   console.log('[query] - :' + err)
   throw new Error(err)
   }
   console.log(rs)
   res.json(rs)
   })
   }*/
}
/**
 * Created by Administrator on 2017/7/10.
 */

