let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')
let {formatCurrency} = require('../../../utils/utils')

module.exports = {
  //借款通过率数据
  fetchAll (req, res) {
    let params = req.body
    console.log(111111)
    func.connPool1(sql.RMAB.loanOverdueRecallRate14.selectAll, tableName.loanOverdueRecallRate14, function (err, rs) {
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
  //借款通过率总条数
  // getCount (req, res) {
  //   let params = req.body
  //   func.connPool1(sql.dataAnalysis.getCount, [tableName.loanThroughRate, params.startTime, params.endTime], function (err, rs) {
  //     if (err) {
  //       console.log('[query] - :' + err)
  //       if (err.message === 'Query inactivity timeout') {
  //         res.json({
  //           code: '1024'
  //         })
  //       } else {
  //         res.json({
  //           code: '404'
  //         })
  //       }
  //       return
  //     }
  //     res.json(rs)
  //   })
  // }
}
/**
 * Created by Administrator on 2017/7/10.
 */
