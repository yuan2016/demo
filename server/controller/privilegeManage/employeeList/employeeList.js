let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let tableName = require('../../../config/tableName')
let {analysis} = require('../../../utils/utils')

module.exports = {
  //员工信息
  fetchAll (req, res) {
    let params = req.body
    let queries = analysis(params)
    let query = sql.privilegeManage.employeeList.selectAllFront + queries.slice(0, 3).join(' and ') + sql.privilegeManage.employeeList.selectAllBack
    func.connPool1(query, [tableName.privilegeManage.employeeList, params.offset, params.limit], function (err, rs) {
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
  //员工条数
  getCount (req, res) {
    let params = req.body
    let queries = analysis(params)
    let query = sql.privilegeManage.employeeList.getCount + queries.slice(0, 3).join(' and ')
    func.connPool1(query, tableName.privilegeManage.employeeList, function (err, rs) {
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
  //权限变更
  privilegeModify (req, res) {
    let params = req.body
    let query = sql.privilegeManage.employeeList.privilegeModify
    func.connPool1(query, [tableName.privilegeManage.employeeList, params.tables, params.email], function (err, rs) {
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
      if (rs.changedRows === 1) {
        res.json(200)
      } else {
        res.json(500)
      }
    })
  }
}
