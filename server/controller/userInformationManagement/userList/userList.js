let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')
let {analysis, complexMosaic, handleProperty, handleTime, combine} = require('../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.create_time) {
      row.create_time = moment(row.create_time).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.birthday) {
      row.birthday = moment(row.birthday).format('YYYY-MM-DD')
    }
    return row
  })
}

module.exports = {
  //用户列表数据
  fetchAll (req, res) {
    let order
    let params = req.body
    let queries = handleProperty(params.options)
    let timeOption = 'create_time'
    if( params.endTime !== '') {
      timeOption = ' date_format( ' + timeOption + ' ,\'%Y-%m-%d\') '
    }
    let timeLimit = handleTime(timeOption, params.startTime, params.endTime)
    let combined = combine(queries, timeLimit)
    let add = complexMosaic(params, 'status', '2')
    if ( combined === '' ) {
      combined = ' where '
      add = add.slice(4)
    }
    if (params.order) {
      order = params.order
    } else {
      order = sql.userInformationManagement.userList.order
    }
    let query = sql.userInformationManagement.userList.selectAllFront + combined + add + order + sql.userInformationManagement.userList.limit
    func.connPool2(query, [tableName.userList, params.offset, params.limit], function (err, rs) {
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
  //用户列表总条数
  getCount (req, res) {
    let params = req.body
    let queries = handleProperty(params.options)
    let timeOption = 'create_time'
    if( params.endTime !== '') {
      timeOption = ' date_format( ' + timeOption + ' ,\'%Y-%m-%d\') '
    }
    let timeLimit = handleTime(timeOption, params.startTime, params.endTime)
    let combined = combine(queries, timeLimit)
    let add = complexMosaic(params, 'status', '2')
    let query = sql.userInformationManagement.userList.getCount + combined + add
    func.connPool2(query, [tableName.userList], function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
        console.log(err.message)
        console.log(err.message === 'Query inactivity timeout')
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

