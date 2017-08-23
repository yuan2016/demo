let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')
let {formatCurrency, mosaicName} = require('../../../utils/utils')
let {exportJsonToExcel} = require('../../../utils/excel')
let fs = require('fs')
let path = require('path')

const tHeader = [['', '后台数据', '第三方数据', '差异(后台-第三方)', '后台数据', '第三方数据', '差异(后台-第三方)', '后台数据', '第三方数据', '差异(后台-第三方)', '后台数据', '第三方数据', '差异(后台-第三方)', '线下免还款金额', '备注'], ['日期', '富友账户', '', '', '连连账户', '', '', '支付宝账户', '', '', '益码通支付宝账户', '', '', '批注', '']]
const filterVal = ['d_date', 'AMT_FY', '', '', 'AMT_LL', '', '', 'AMT_ZFB', '', '', 'AMT_YMT', '', '', 'AMT_JM', '']
const merge = [[0, 0, 0, 1], [1, 0, 3, 0], [4, 0, 6, 0], [7, 0, 9, 0], [10, 0, 12, 0], [13, 0, 14, 0]]
const change = [['A1', '  日期'], ['B1', '                富友账户'], ['E1', '                 连连账户'], ['H1', '               支付宝账户'], ['K1', '            益码通支付宝账户'], ['N1', '        批注']]

function formatJson (filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
}

function formatData (rows) {
  return rows.map(row => {
    if (row.d_date) {
      row.d_date = moment(row.d_date).format('YYYY-MM-DD')
    }

    if (row.AMT_FY) {
      row.AMT_FY = formatCurrency(row.AMT_FY)
    }
    if (row.AMT_LL) {
      row.AMT_LL = formatCurrency(row.AMT_LL)
    }
    if (row.AMT_ZFB) {
      row.AMT_ZFB = formatCurrency(row.AMT_ZFB)
    }
    if (row.AMT_YMT) {
      row.AMT_YMT = formatCurrency(row.AMT_YMT)
    }
    if (row.AMT_JM) {
      row.AMT_JM = formatCurrency(row.AMT_JM)
    }
    return row
  })
}

module.exports = {
  //每日还款金额数据
  fetchAll (req, res) {
    let params = req.body
    let query = sql.financeAnalysis.reconciliationAnalysis.selectAllFront + sql.financeAnalysis.reconciliationAnalysis.orderBy + sql.financeAnalysis.reconciliationAnalysis.selectAllBack
    func.connPool1(query, [tableName.reconciliationAnalysis, params.startTime, params.endTime, params.offset, params.limit], function (err, rs) {
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
    let query = sql.financeAnalysis.reconciliationAnalysis.getCount
    func.connPool1(query, [tableName.reconciliationAnalysis, params.startTime, params.endTime], function (err, rs) {
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
  getExcelData (req, res) {
    let params = req.query

    let query = sql.financeAnalysis.reconciliationAnalysis.selectAllFront + sql.financeAnalysis.reconciliationAnalysis.orderBy
    func.connPool1(query, [tableName.reconciliationAnalysis, params.startTime, params.endTime], function (err, rs) {
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
      const data = formatJson(filterVal, rs)

      let fileName = mosaicName()
      exportJsonToExcel(tHeader, data, fileName, merge, change)
      let currFilePath = path.join(process.cwd(), fileName)
      let options = {
        headers: {
          'Content-Disposition': 'attachment; filename=' + fileName
        }
      }
      res.sendFile(currFilePath, options, function () {
        if (err) {
          console.log(err)
          res.sendFile(path.join(process.cwd(), 'error.html'))
        } else {
          console.log('Sent:', fileName)
          fs.unlink(currFilePath, function (err) {
            if (err) console.log(err)
            console.log('文件删除成功')
          })
        }
      })
    }, 180000)
  }
}
