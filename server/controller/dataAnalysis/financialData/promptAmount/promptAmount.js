let sql = require('../../../../sql/sqlMap')
let func = require('../../../../sql/func')
let moment = require('moment')
let tableName = require('../../../../config/tableName')
let {formatCurrency} = require('../../../../utils/utils')
let shell = require('../../../../config/shell')
let process = require('child_process')

global.promptAmountCount = 0

function formatData (rows) {
  return rows.map(row => {
    if (row.UPDATE_TIME) {
      row.UPDATE_TIME = moment(row.UPDATE_TIME).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.CREATE_TIME) {
      row.CREATE_TIME = moment(row.CREATE_TIME).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.D_DATE) {
      row.D_DATE = moment(row.D_DATE).format('YYYY-MM-DD')
    }

    if (row.COLLECTION_PRINCIPAL_DAY) {
      row.COLLECTION_PRINCIPAL_DAY = formatCurrency(row.COLLECTION_PRINCIPAL_DAY)
    }
    if (row.COLLECTION_PRINCIPAL_DOING) {
      row.COLLECTION_PRINCIPAL_DOING = formatCurrency(row.COLLECTION_PRINCIPAL_DOING)
    }
    if (row.COLLECTION_PRINCIPAL_DOING_S1) {
      row.COLLECTION_PRINCIPAL_DOING_S1 = formatCurrency(row.COLLECTION_PRINCIPAL_DOING_S1)
    }
    if (row.COLLECTION_PRINCIPAL_DOING_S2) {
      row.COLLECTION_PRINCIPAL_DOING_S2 = formatCurrency(row.COLLECTION_PRINCIPAL_DOING_S2)
    }
    if (row.COLLECTION_PRINCIPAL_DOING_M2) {
      row.COLLECTION_PRINCIPAL_DOING_M2 = formatCurrency(row.COLLECTION_PRINCIPAL_DOING_M2)
    }
    if (row.COLLECTION_PRINCIPAL_DOING_M3) {
      row.COLLECTION_PRINCIPAL_DOING_M3 = formatCurrency(row.COLLECTION_PRINCIPAL_DOING_M3)
    }
    if (row.COLLECTION_PRINCIPAL_DOING_M3PLUS) {
      row.COLLECTION_PRINCIPAL_DOING_M3PLUS = formatCurrency(row.COLLECTION_PRINCIPAL_DOING_M3PLUS)
    }
    if (row.COLLECTION_LATE_FEE_DOING) {
      row.COLLECTION_LATE_FEE_DOING = formatCurrency(row.COLLECTION_LATE_FEE_DOING)
    }
    if (row.COLLECTION_LATE_FEE_DOING_S1) {
      row.COLLECTION_LATE_FEE_DOING_S1 = formatCurrency(row.COLLECTION_LATE_FEE_DOING_S1)
    }
    if (row.COLLECTION_LATE_FEE_DOING_S2) {
      row.COLLECTION_LATE_FEE_DOING_S2 = formatCurrency(row.COLLECTION_LATE_FEE_DOING_S2)
    }
    if (row.COLLECTION_LATE_FEE_DOING_M2) {
      row.COLLECTION_LATE_FEE_DOING_M2 = formatCurrency(row.COLLECTION_LATE_FEE_DOING_M2)
    }
    if (row.COLLECTION_LATE_FEE_DOING_M3) {
      row.COLLECTION_LATE_FEE_DOING_M3 = formatCurrency(row.COLLECTION_LATE_FEE_DOING_M3)
    }
    if (row.COLLECTION_LATE_FEE_DOING_M3PLUS) {
      row.COLLECTION_LATE_FEE_DOING_M3PLUS = formatCurrency(row.COLLECTION_LATE_FEE_DOING_M3PLUS)
    }

    if (row.COLLECTION_PRINCIPAL_DOING_RATE_S1) {
      row.COLLECTION_PRINCIPAL_DOING_RATE_S1 = (row.COLLECTION_PRINCIPAL_DOING_RATE_S1 * 100).toFixed(2) + '%'
    }
    if (row.COLLECTION_PRINCIPAL_DOING_RATE_S2) {
      row.COLLECTION_PRINCIPAL_DOING_RATE_S2 = (row.COLLECTION_PRINCIPAL_DOING_RATE_S2 * 100).toFixed(2) + '%'
    }
    if (row.COLLECTION_PRINCIPAL_DOING_RATE_M2) {
      row.COLLECTION_PRINCIPAL_DOING_RATE_M2 = (row.COLLECTION_PRINCIPAL_DOING_RATE_M2 * 100).toFixed(2) + '%'
    }
    if (row.COLLECTION_PRINCIPAL_DOING_RATE_M3) {
      row.COLLECTION_PRINCIPAL_DOING_RATE_M3 = (row.COLLECTION_PRINCIPAL_DOING_RATE_M3 * 100).toFixed(2) + '%'
    }
    if (row.COLLECTION_PRINCIPAL_DOING_RATE_M3PLUS) {
      row.COLLECTION_PRINCIPAL_DOING_RATE_M3PLUS = (row.COLLECTION_PRINCIPAL_DOING_RATE_M3PLUS * 100).toFixed(2) + '%'
    }
    if (row.OVERDUE_RATE) {
      row.OVERDUE_RATE = (row.OVERDUE_RATE * 100).toFixed(2) + '%'
    }
    return row
  })
}

module.exports = {
  //每日还款金额数据
  fetchAll (req, res) {
    let params = req.body
    func.connPool1(sql.dataAnalysis.selectAll, [tableName.promptAmount, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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
  //每日还款金额数据总条数
  getCount (req, res) {
    let params = req.body
    func.connPool1(sql.dataAnalysis.getCount, [tableName.promptAmount, params.startTime, params.endTime], function (err, rs) {
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
  refreshData (req, res) {
    if (global.promptAmountCount === 0) {
      global.promptAmountCount++
      process.exec(shell.promptAmount, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error)
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + '在催金额shell脚本执行失败')
          res.json({code: '500'})
          global.promptAmountCount = 0
        } else {
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + '在催金额shell脚本执行成功')
          res.json({code: '200'})
          global.promptAmountCount = 0
        }
      })
      console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + '在催金额开始执行shell脚本')
    } else {
      res.json({code: '400'})
    }
  }
}
