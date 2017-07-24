let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')
let {analysis} = require('../../../utils/utils')

function formatData (rows) {
  return rows.map(row => {
    if (row.create_time) {
      row.create_time = moment(row.create_time).format('YYYY-MM-DD hh:mm:ss')
    }
    if (row.update_time) {
      row.update_time = moment(row.update_time).format('YYYY-MM-DD hh:mm:ss')
    }
    return row
  })
}

module.exports = {
  //用户通讯录数据
  fetchAll (req, res) {
    let params = req.body
    let queries = analysis(params)
    let query = sql.userInformationManagement.userNameAuthenticationList.selectAllFront + queries.slice(0, 3).join(' and ') + sql.userInformationManagement.userNameAuthenticationList.selectAllBack
    func.connPool2(query, [tableName.userNameAuthenticationList, params.offset, params.limit], function (err, rs) {
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
      let query = sql.userInformationManagement.userNameAuthenticationList.getCount + queries.slice(0, 3).join(' and ')
      func.connPool2(query, tableName.userNameAuthenticationList, function (err, rs) {
        if (err) {
          console.log('[query] - :' + err)
          throw new Error(err)
        }
        res.json(rs)
      })
    }*/
}
/**
 * Created by Administrator on 2017/7/10.
 */
