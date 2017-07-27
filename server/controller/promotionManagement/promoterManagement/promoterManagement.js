/**
 * Created by Administrator on 2017/7/12.
 */
let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')
let {analysis, mosaic} = require('../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.created_at) {
      row.created_at = moment(row.created_at).format('YYYY-MM-DD hh:mm:ss')
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
    let queries = analysis(params, 't1')
    let add = mosaic(params, 'channel_name', 't2')
    let query = sql.promotionManagement.promoterManagement.selectAllFront + queries.slice(0, 2).join(' and ') + add + sql.promotionManagement.promoterManagement.selectAllBack
    func.connPool2(query, [tableName.promoterManagement.t, tableName.promoterManagement.t1, tableName.promoterManagement.t2, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
        throw new Error(err)
      }
      rs = formatData(rs)
      res.json(rs)
    })
  },
  //拿到下拉框数据
  getSelectOptions (req, res) {
    func.connPool2(sql.promotionManagement.promoterManagement.getSelectOptions, function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
        throw new Error(err)
      }
      rs = packageRows(rs)
      res.json(rs)
    })
  }
}
/**
 * Created by Administrator on 2017/7/10.
 */

