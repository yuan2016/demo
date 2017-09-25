/**
 * Created by Administrator on 2017/7/12.
 */
let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let moment = require('moment')
let tableName = require('../../../../config/tableName')
let {analysis, mosaic, formatCurrency, handleProperty, handleTime, combine} = require('../../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.return_time) {
      row.return_time = moment(row.return_time).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.repayment_return_money) {
      row.repayment_return_money = formatCurrency(row.repayment_return_money)
    }
    return row
  })
}

module.exports = {

  //用户通讯录数据
  fetchAll (req, res) {
    let params = req.body
    let queries = handleProperty(params.options)
    let timeOption = 't.return_time'
    if( params.endTime !== '') {
      timeOption = ' date_format( ' + timeOption + ' ,\'%Y-%m-%d\') '
    }
    let timeLimit = handleTime(timeOption, params.startTime, params.endTime)
    let combined = combine(queries, timeLimit)
    let add = mosaic(params, 'user_phone', 't1')
    let order = ''
    if (params.order) {
      order = params.order
    }
    let query = sql.repaymentManagement.rebackedList.selectAllFront + combined + add + order + sql.repaymentManagement.rebackedList.selectAllBack
    func.connPool2(query, [tableName.rebackedList.t, tableName.rebackedList.t1, params.offset, params.limit], function (err, rs) {
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
    let timeOption = 't.return_time'
    if( params.endTime !== '') {
      timeOption = ' date_format( ' + timeOption + ' ,\'%Y-%m-%d\') '
    }
    let timeLimit = handleTime(timeOption, params.startTime, params.endTime)
    let combined = combine(queries, timeLimit)
    let add = mosaic(params, 'user_phone', 't1')
    let query = sql.repaymentManagement.rebackedList.getCount + combined + add
    func.connPool2(query, [tableName.rebackedList.t, tableName.rebackedList.t1], function (err, rs) {
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

