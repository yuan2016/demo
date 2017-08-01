/**
 * Created by Administrator on 2017/7/12.
 */
let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let tableName = require('../../../config/tableName')
let {analysis} = require('../../../utils/utils')

module.exports = {

  //用户通讯录数据
  fetchAll (req, res) {
    let params = req.body
    let queries = analysis(params, 'A')
    let query = sql.userInformationManagement.userAuthenticationList.selectAllFront + queries.slice(0, 3).join(' and ') + sql.userInformationManagement.userAuthenticationList.selectAllBack
    func.connPool2(query, [tableName.userAuthenticationList.A, tableName.userAuthenticationList.B, params.offset, params.limit], function (err, rs) {
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
  //用户通讯录总条数
  getCount (req, res) {
    let params = req.body
    let queries = analysis(params, 'A')
    let query = sql.userInformationManagement.userAuthenticationList.getCount + queries.slice(0, 3).join(' and ')
    func.connPool2(query, [tableName.userAuthenticationList.A, tableName.userAuthenticationList.B], function (err, rs) {
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

