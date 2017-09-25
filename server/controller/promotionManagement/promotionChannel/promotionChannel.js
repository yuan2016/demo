/**
 * Created by Administrator on 2017/7/12.
 */
let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')
let {analysis, handleProperty, handleTime, combine} = require('../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.created_at) {
      row.created_at = moment(row.created_at).format('YYYY-MM-DD HH:mm:ss')
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
    let timeOption = 't.created_at'
    if( params.endTime != '') {
      timeOption = ' date_format( ' + timeOption + ' ,\'%Y-%m-%d\') '
    }
    let timeLimit = handleTime(timeOption, params.startTime, params.endTime)
    if( timeLimit != ''){
      timeLimit = ' and ' + timeLimit
    }
    let order = ''
    if (params.order) {
      order = params.order
    }
    let query = sql.promotionManagement.promotionChannel.selectAllFront + queries + timeLimit + order + sql.promotionManagement.promotionChannel.selectAllBack
    func.connPool2(query, [tableName.promotionChannel.t, tableName.promotionChannel.t1, params.offset, params.limit], function (err, rs) {
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
    let timeOption  = 't.created_at'
    if( params.endTime != '') {
      timeOption = ' date_format( ' + timeOption + ' ,\'%Y-%m-%d\') '
    }
    let timeLimit = handleTime(timeOption, params.startTime, params.endTime)
    if( timeLimit != ''){
      timeLimit = ' and ' + timeLimit
    }
    let query = sql.promotionManagement.promotionChannel.getCount + queries + timeLimit
    func.connPool2(query, [tableName.promotionChannel.t, tableName.promotionChannel.t1], function (err, rs) {
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
  }
}
/**
 * Created by Administrator on 2017/7/10.
 */

