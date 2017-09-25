/**
 * Created by Administrator on 2017/7/12.
 */
let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')
let {analysis, mosaic, handleProperty, handleTime, combine} = require('../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.created_at) {
      row.created_at = moment(row.created_at).format('YYYY-MM-DD HH:mm:ss')
    }
    return row
  })
}

function packageRows (rows) {
  let options = [{value: '', label: '不限'}]
  for (let row of rows) {
    let option = {}
    if (row.channel_name && row.channel_name !== '') {
      option.value = row.channel_name
      option.label = row.channel_name
      options.push(option)
    }
  }
  return options
}

module.exports = {

  //用户通讯录数据
  fetchAll (req, res) {
    let params = req.body
    let queries = handleProperty(params.options)
    if ( queries.length > 0) {
      queries = ' and ' + queries
    }
    let timeOption  = 't.created_at'
    if( params.endTime != '') {
      timeOption = ' date_format( t.created_at ,\'%Y-%m-%d\') '
    }
    let timeLimit = handleTime(timeOption, params.startTime, params.endTime)
    if( timeLimit != ''){
      timeLimit = ' and ' + timeLimit
    }
    let add = mosaic(params, 'channel_name', 't2')
    let order = ''
    if (params.order) {
      order = params.order
    }
    let query = sql.promotionManagement.promoterManagement.selectAllFront + queries + timeLimit + add + order + sql.promotionManagement.promoterManagement.selectAllBack
    func.connPool2(query, [tableName.promoterManagement.t, tableName.promoterManagement.t1, tableName.promoterManagement.t2, params.offset, params.limit], function (err, rs) {
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
  getCount (req, res) {
    let params = req.body
    let queries = handleProperty(params.options)
    if ( queries.length > 0) {
      queries = ' and ' + queries
    }
    let timeOption  = 't.created_at'
    if( params.endTime != '') {
      timeOption = ' date_format( t.created_at ,\'%Y-%m-%d\') '
    }
    let timeLimit = handleTime(timeOption, params.startTime, params.endTime)
    if( timeLimit != ''){
      timeLimit = ' and ' + timeLimit
    }
    let add = mosaic(params, 'channel_name', 't2')
    let query = sql.promotionManagement.promoterManagement.getCount +  queries + timeLimit + add
    func.connPool2(query, [tableName.promoterManagement.t, tableName.promoterManagement.t1, tableName.promoterManagement.t2], function (err, rs) {
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
  //拿到下拉框数据
  getSelectOptions (req, res) {
    func.connPool2(sql.promotionManagement.promoterManagement.getSelectOptions, tableName.promoterManagement.t2, function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
      }
      rs = packageRows(rs)
      res.json(rs)
    })
  }
}
/**
 * Created by Administrator on 2017/7/10.
 */

