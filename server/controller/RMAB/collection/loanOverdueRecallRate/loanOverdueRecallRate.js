let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let tableName = require('../../../../config/tableName')

module.exports = {
  //借款通过率数据
  fetchAll (req, res) {
    let params = req.body
    func.connPool1(sql.RMAB.loanOverdueRecallRate.selectAll, [tableName.loanOverdueRecallRate, params.loan_term], function (err, rs) {
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
