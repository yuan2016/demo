/**
 * Created by Administrator on 2017/7/12.
 */
let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let moment = require('moment')
let tableName = require('../../../../config/tableName')
let {mosaic, formatCurrency} = require('../../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.old_repayment_time) {
      row.old_repayment_time = moment(row.old_repayment_time).format('YYYY-MM-DD hh:mm:ss')
    }
    if (row.repayment_time) {
      row.repayment_time = moment(row.repayment_time).format('YYYY-MM-DD hh:mm:ss')
    }
    if (row.order_time) {
      row.order_time = moment(row.order_time).format('YYYY-MM-DD hh:mm:ss')
    }
    if (row.repayment_principal) {
      row.repayment_principal = formatCurrency(row.repayment_principal)
    }
    if (row.repayment_interest) {
      row.repayment_interest = formatCurrency(row.repayment_interest)
    }
    if (row.renewal_amount) {
      row.renewal_amount = formatCurrency(row.renewal_amount)
    }
    return row
  })
}

module.exports = {

  //用户通讯录数据
  fetchAll (req, res) {
    let params = req.body
    let add = mosaic(params, 'user_phone', 't2')
    let query = sql.repaymentManagement.renewalParticulars.selectAllFront + add + sql.repaymentManagement.renewalParticulars.selectAllBack
    func.connPool2(query, [tableName.renewalParticulars.t, tableName.renewalParticulars.t1, tableName.renewalParticulars.t2, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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

