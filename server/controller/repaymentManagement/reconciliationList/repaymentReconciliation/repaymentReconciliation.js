/**
 * Created by Administrator on 2017/7/12.
 */
let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let moment = require('moment')
let tableName = require('../../../../config/tableName')
let {analysis, mosaic, formatCurrency} = require('../../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.repayment_time) {
      row.repayment_time = moment(row.repayment_time).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.money_amount) {
      row.money_amount = formatCurrency(row.money_amount)
    }
    if (row.repayment_principal) {
      row.repayment_principal = formatCurrency(row.repayment_principal)
    }
    if (row.repayment_amount) {
      row.repayment_amount = formatCurrency(row.repayment_amount)
    }
    if (row.repaymented_amount) {
      row.repaymented_amount = formatCurrency(row.repaymented_amount)
    }
    if (row.true_repayment_money) {
      row.true_repayment_money = formatCurrency(row.true_repayment_money)
    }
    if (row.return_money) {
      row.return_money = formatCurrency(row.return_money)
    }
    return row
  })
}

module.exports = {

  //用户通讯录数据
  fetchAll (req, res) {
    let params = req.body
    let queries = analysis(params, 't2')
    let add = mosaic(params, 'user_phone', 't1')
    let query = sql.repaymentManagement.repaymentReconciliation.selectAllFront + queries.slice(0, 2).join(' and ') + add + sql.repaymentManagement.repaymentReconciliation.selectAllBack
    func.connPool2(query, [tableName.repaymentReconciliation.t, tableName.repaymentReconciliation.t1, tableName.repaymentReconciliation.t2, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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
  //用户通讯录总条数
  getCount (req, res) {
    let params = req.body
    let queries = analysis(params, 't2')
    let add = mosaic(params, 'user_phone', 't1')
    let query = sql.repaymentManagement.repaymentReconciliation.getCount + queries.slice(0, 2).join(' and ') + add
    func.connPool2(query, [tableName.repaymentReconciliation.t, tableName.repaymentReconciliation.t1, tableName.repaymentReconciliation.t2, params.startTime, params.endTime], function (err, rs) {
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
      console.log(rs)
      res.json(rs)
    })
  }
}
/**
 * Created by Administrator on 2017/7/10.
 */

