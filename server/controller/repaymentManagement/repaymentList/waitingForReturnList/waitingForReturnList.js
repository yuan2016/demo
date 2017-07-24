/**
 * Created by Administrator on 2017/7/12.
 */
let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let moment = require('moment')
let tableName = require('../../../../config/tableName')
let {analysis, formatCurrency} = require('../../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.credit_repayment_time) {
      row.credit_repayment_time = moment(row.credit_repayment_time).format('YYYY-MM-DD')
    }
    if (row.repayment_time) {
      row.repayment_time = moment(row.repayment_time).format('YYYY-MM-DD')
    }
    if (row.repayment_principal) {
      row.repayment_principal = formatCurrency(row.repayment_principal)
    }
    if (row.repayment_interest) {
      row.repayment_interest = formatCurrency(row.repayment_interest)
    }
    if (row.repayment_amount) {
      row.repayment_amount = formatCurrency(row.repayment_amount)
    }
    if (row.repaymented_amount) {
      row.repaymented_amount = formatCurrency(row.repaymented_amount)
    }
    row.status = '已放款/待还款'
    return row
  })
}

module.exports = {

  //用户通讯录数据
  fetchAll (req, res) {
    let params = req.body
    let queries = analysis(params, 't1')
    let query = sql.repaymentManagement.waitingForReturnList.selectAllFront + queries.slice(0, 2).join(' and ') + sql.repaymentManagement.waitingForReturnList.selectAllBack
    func.connPool2(query, [tableName.waitingForReturnList.t, tableName.waitingForReturnList.t1, params.offset, params.limit], function (err, rs) {
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

