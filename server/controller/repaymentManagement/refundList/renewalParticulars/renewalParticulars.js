/**
 * Created by Administrator on 2017/7/12.
 */
let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let moment = require('moment')
let tableName = require('../../../../config/tableName')
let {mosaic, formatCurrency, formatInt, handleProperty, handleTime, combine} = require('../../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.old_repayment_time) {
      row.old_repayment_time = moment(row.old_repayment_time).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.repayment_time) {
      row.repayment_time = moment(row.repayment_time).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.order_time) {
      row.order_time = moment(row.order_time).format('YYYY-MM-DD HH:mm:ss')
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
    if (row.renewal_count) {
      row.renewal_count = formatInt(row.renewal_count)
    }
    if (row.renewal_day) {
      row.renewal_day = formatInt(row.renewal_day)
    }
    return row
  })
}

module.exports = {

  //用户通讯录数据
  fetchAll (req, res) {
    let params = req.body
    let queries = handleProperty(params.options)
    if ( queries.length > 0) {
      queries = ' and ' + queries
    }
    let timeOption = 't.order_time'
    if( params.endTime !== '') {
      timeOption = ' date_format( ' + timeOption + ' ,\'%Y-%m-%d\') '
    }
    let timeLimit = handleTime(timeOption, params.startTime, params.endTime)
    if ( timeLimit !== '') {
      timeLimit = ' and ' + timeLimit
    }
    let add = mosaic(params, 'user_phone', 't2')
    let order = ''
    if (params.order) {
      order = params.order
    }
    let query = sql.repaymentManagement.renewalParticulars.selectAllFront + queries + timeLimit + add + order + sql.repaymentManagement.renewalParticulars.selectAllBack
    func.connPool2(query, [tableName.renewalParticulars.t, tableName.renewalParticulars.t1, tableName.renewalParticulars.t2, params.offset, params.limit], function (err, rs) {
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
    let queries = handleProperty(params.options)
    if ( queries.length > 0) {
      queries = ' and ' + queries
    }
    let timeOption = 't.order_time'
    if( params.endTime !== '') {
      timeOption = ' date_format( ' + timeOption + ' ,\'%Y-%m-%d\') '
    }
    let timeLimit = handleTime(timeOption, params.startTime, params.endTime)
    if ( timeLimit !== '') {
      timeLimit = ' and ' + timeLimit
    }
    let add = mosaic(params, 'user_phone', 't2')
    let query = sql.repaymentManagement.renewalParticulars.getCount + queries + add
    func.connPool2(query, [tableName.renewalParticulars.t, tableName.renewalParticulars.t1, tableName.renewalParticulars.t2], function (err, rs) {
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

