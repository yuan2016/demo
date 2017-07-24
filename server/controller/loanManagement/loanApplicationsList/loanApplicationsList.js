/**
 * Created by Administrator on 2017/7/12.
 */
let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')
let {analysis, formatCurrency} = require('../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.order_time) {
      row.order_time = moment(row.order_time).format('YYYY-MM-DD hh:mm:ss')
    }
    if (row.verify_loan_time) {
      row.verify_loan_time = moment(row.verify_loan_time).format('YYYY-MM-DD hh:mm:ss')
    }
    if (row.updated_at) {
      row.updated_at = moment(row.updated_at).format('YYYY-MM-DD hh:mm:ss')
    }
    if (row.money_amount) {
      row.money_amount = formatCurrency(row.money_amount / 100)
    }
    if (row.into_money) {
      row.into_money = formatCurrency(row.into_money / 100)
    }
    if (row.loan_interests) {
      row.loan_interests = formatCurrency(row.loan_interests / 100)
    }
    if (row.sjloan_urgent_fee) {
      row.sjloan_urgent_fee = formatCurrency(row.sjloan_urgent_fee / 100)
    }
    if (row.apr) {
      row.apr = formatCurrency(row.apr)
    }
    row.child_type = '现金快贷'
    return row
  })
}

module.exports = {

  //用户通讯录数据
  fetchAll (req, res) {
    let params = req.body
    let queries = analysis(params)
    let query = sql.loanManagement.loanApplicationsList.selectAllFront + queries.slice(0, 5).join(' and ') + sql.loanManagement.loanApplicationsList.selectAllBack
    func.connPool2(query, [tableName.loanApplicationsList, params.offset, params.limit], function (err, rs) {
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
