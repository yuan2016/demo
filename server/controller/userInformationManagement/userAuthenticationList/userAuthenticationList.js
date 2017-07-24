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
        throw new Error(err)
      }
      res.json(rs)
    })
  }
  //用户通讯录总条数
  /*  getCount (req, res) {
   let params = req.body
   let queries = analysis(params)
   let query = sql.userInformationManagement.userAddressBook.getCount + queries.slice(0, 3).join(' and ')
   func.connPool2(query, tableName.userAddressBook, function (err, rs) {
   if (err) {
   console.log('[query] - :' + err)
   throw new Error(err)
   }
   console.log(rs)
   res.json(rs)
   })
   }*/
}
/**
 * Created by Administrator on 2017/7/10.
 */

