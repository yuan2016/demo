let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')
let {analysis, formatInt, handleProperty, handleTime, combine} = require('../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.d_date) {
      row.d_date = moment(row.d_date).format('YYYY-MM-DD')
    }
    if (row.pv) {
      row.pv = formatInt(row.pv)
    }
    if (row.uv) {
      row.uv = formatInt(row.uv)
    }
    return row
  })
}

function packageRows (rows) {
  let options = [{value: '', label: '不限'}]
  for (let row of rows) {
    let option = {}
    if (row.title && row.title !== '') {
      option.value = row.title
      option.label = row.title
      options.push(option)
    }
  }
  return options
}

module.exports = {

  //用户通讯录数据
  fetchAll (req, res) {
    let params = req.body
    // let startTime = params.startTime
    // let endTime = params.endTime
    // let timeLimit
    // if (!startTime && !endTime) {
    //   timeLimit = sql.promotionManagement.PVUV.selectDayBack
    // } else if (startTime && !endTime) {
    //   timeLimit = 'd_date>="' + startTime + '"'
    // } else if (!startTime && endTime) {
    //   timeLimit = 'd_date<="' + endTime + '"'
    // } else {
    //   timeLimit = 'd_date<="' + endTime + '" and d_date>="' + startTime + '"'
    // }
    let queries = handleProperty(params.options)
    let timeOption = 'd_date'
    let timeLimit = handleTime(timeOption, params.startTime, params.endTime)
    let combined = combine(queries, timeLimit)
    let order
    if (params.order) {
      order = params.order
    } else {
      order = sql.promotionManagement.PVUV.order
    }
    let query = sql.promotionManagement.PVUV.selectDayFront + combined + order + sql.promotionManagement.PVUV.limit
    func.connPool1(query, [tableName.PVUV, params.offset, params.limit], function (err, rs) {
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
    // let startTime = params.startTime
    // let endTime = params.endTime
    // let timeLimit
    // if (!startTime && !endTime) {
    //   timeLimit = sql.promotionManagement.PVUV.selectDayBack
    // } else if (startTime && !endTime) {
    //   timeLimit = 'd_date>="' + startTime + '"'
    // } else if (!startTime && endTime) {
    //   timeLimit = 'd_date<="' + endTime + '"'
    // } else {
    //   timeLimit = 'd_date<="' + endTime + '" and d_date>="' + startTime + '"'
    // }
    let queries = handleProperty(params.options)
    let timeOption = 'd_date'
    let timeLimit = handleTime(timeOption, params.startTime, params.endTime)
    let combined = combine(queries,timeLimit)
    let query = sql.promotionManagement.PVUV.getCount + combined
    func.connPool1(query, [tableName.PVUV], function (err, rs) {
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
  },
  getSelectOptions (req, res) {
    func.connPool1(sql.promotionManagement.PVUV.getSelectOptions, tableName.PVUV, function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
      }
      rs = packageRows(rs)
      res.json(rs)
    })
  }
}
