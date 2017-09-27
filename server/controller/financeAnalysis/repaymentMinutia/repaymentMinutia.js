let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')
let {analysis, formatCurrency, mosaicName, handleProperty, handleTime, combine} = require('../../../utils/utils')
let path = require('path')
let fs = require('fs')
let XLSXWriter = require('xlsx-writestream')

function formatData (rows) {
  return rows.map(row => {
    if (row.credit_repayment_time) {
      row.credit_repayment_time = moment(row.credit_repayment_time).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.d_date) {
      row.d_date = moment(row.d_date).format('YYYY-MM-DD')
    }
    if (row.repayment_time) {
      row.repayment_time = moment(row.repayment_time).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.repayment_real_time) {
      row.repayment_real_time = moment(row.repayment_real_time).format('YYYY-MM-DD HH:mm:ss')
    }

    if (row.loan_money) {
      row.loan_money = formatCurrency(row.loan_money)
    }
    if (row.repayment_amount) {
      row.repayment_amount = formatCurrency(row.repayment_amount)
    }
    if (row.repaymented_amount) {
      row.repaymented_amount = formatCurrency(row.repaymented_amount)
    }
    if (row.repayment_real_money) {
      row.repayment_real_money = formatCurrency(row.repayment_real_money)
    }
    if (row.return_money) {
      row.return_money = formatCurrency(row.return_money)
    }
    return row
  })
}

function formatExcelData (rows) {
  return rows.map(row => {
    if (row.放款时间) {
      row.放款时间 = moment(row.放款时间).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.日期) {
      row.日期 = moment(row.日期).format('YYYY-MM-DD')
    }
    if (row.应还款时间) {
      row.应还款时间 = moment(row.应还款时间).format('YYYY-MM-DD HH:mm:ss')
    }
    if (row.实际还款时间) {
      row.实际还款时间 = moment(row.实际还款时间).format('YYYY-MM-DD HH:mm:ss')
    }

    if (row.借款金额) {
      row.借款金额 = formatCurrency(row.借款金额)
    }
    if (row.总应还款金额) {
      row.总应还款金额 = formatCurrency(row.总应还款金额)
    }
    if (row.已还金额) {
      row.已还金额 = formatCurrency(row.已还金额)
    }
    if (row.实还金额) {
      row.实还金额 = formatCurrency(row.实还金额)
    }
    if (row.服务费) {
      row.服务费 = formatCurrency(row.服务费)
    }
    if (row.加急费) {
      row.加急费 = formatCurrency(row.加急费)
    }
    if (row.本金) {
      row.本金 = formatCurrency(row.本金)
    }
    if (row.利息) {
      row.利息 = formatCurrency(row.利息)
    }
    if (row.分期费) {
      row.分期费 = formatCurrency(row.分期费)
    }
    if (row.续期服务费) {
      row.续期服务费 = formatCurrency(row.续期服务费)
    }
    if (row.续期手续费) {
      row.续期手续费 = formatCurrency(row.续期手续费)
    }
    if (row.逾期滞纳金) {
      row.逾期滞纳金 = formatCurrency(row.逾期滞纳金)
    }
    if (row.退款金额) {
      row.退款金额 = formatCurrency(row.退款金额)
    }

    //利率
    if (row.基础服务费率) {
      row.基础服务费率 = (row.基础服务费率 * 100).toFixed(2) + '%'
    }
    if (row.加急费率) {
      row.加急费率 = (row.加急费率 * 100).toFixed(2) + '%'
    }
    if (row.借款利率) {
      row.借款利率 = (row.借款利率 * 100).toFixed(2) + '%'
    }
    if (row.分期费率) {
      row.分期费率 = (row.分期费率 * 100).toFixed(2) + '%'
    }
    if (row.续期利率) {
      row.续期利率 = (row.续期利率 * 100).toFixed(2) + '%'
    }
    if (row.逾期费率) {
      row.逾期费率 = (row.逾期费率 * 100).toFixed(2) + '%'
    }
    return row
  })
}

module.exports = {
  //每日还款金额数据
  fetchAll (req, res) {
    let params = req.body
    let queries = handleProperty(params.options)
    let timeOption = 'repayment_real_time'
    if (params.endTime !== '') {
      timeOption = ' date_format( ' + timeOption + ' ,\'%Y-%m-%d\') '
    }
    let timeLimit = handleTime(timeOption, params.startTime, params.endTime)
    let combined = combine(queries, timeLimit)
    let order = ''
    if (params.order) {
      order = params.order
    } else {
      order = sql.financeAnalysis.repaymentMinutia.orderBy
    }
    let query = sql.financeAnalysis.repaymentMinutia.selectAllFront + combined + order + sql.financeAnalysis.repaymentMinutia.selectAllLimit
    func.connPool1(query, [tableName.repaymentMinutia, params.offset, params.limit], function (err, rs) {
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
      res.json(formatData(rs))
    })
  },
  //每日还款金额数据总条数
  getCount (req, res) {
    let params = req.body
    let queries = handleProperty(params.options)
    let timeOption = 'repayment_real_time'
    if (params.endTime !== '') {
      timeOption = ' date_format( ' + timeOption + ' ,\'%Y-%m-%d\') '
    }
    let timeLimit = handleTime(timeOption, params.startTime, params.endTime)
    let combined = combine(queries, timeLimit)
    let query = sql.financeAnalysis.repaymentMinutia.getCount + combined
    func.connPool1(query, tableName.repaymentMinutia, function (err, rs) {
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
    let queries = analysis(params)
    let timeOption = 'repayment_real_time'
    if (params.endTime !== '') {
      timeOption = ' date_format( ' + timeOption + ' ,\'%Y-%m-%d\') '
    }
    let timeLimit = handleTime(timeOption, params.startTime, params.endTime)
    let combined = combine(timeLimit)
    if (combined === '') {
      combined = ' where '
    } else {
      combined = combined + ' and '
    }
    let query = sql.financeAnalysis.repaymentMinutia.selectAllExcel + combined + queries.slice(0, 3).join(' and ') + sql.financeAnalysis.repaymentMinutia.orderBy
    func.connPool1(query, [tableName.repaymentMinutia], function (err, rs) {
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
      rs = formatData(formatExcelData(rs))
      // const data = formatJson(filterVal, rs)

      // let fileName = mosaicName()
      // try {
      //   exportJsonToExcel(tHeader, data, fileName)
      // } catch (e) {
      //   console.log(e)
      //   res.sendFile(path.join(process.cwd(), 'error.html'))
      //   return
      // }
      // let currFilePath = path.join(process.cwd(), fileName)
      // let options = {
      //   headers: {
      //     'Content-Disposition': 'attachment; filename=' + fileName
      //   }
      // }
      // res.sendFile(currFilePath, options, function () {
      //   if (err) {
      //     console.log(err)
      //     res.sendFile(path.join(process.cwd(), 'error.html'))
      //     return
      //   } else {
      //     console.log('Sent:', fileName)
      //     fs.unlink(currFilePath, function (err) {
      //       if (err) console.log(err)
      //       console.log('文件删除成功')
      //     })
      //   }
      // })
      let fileName = mosaicName()
      let currFilePath = path.join(process.cwd(), fileName)
      let options = {
        headers: {
          'Content-Disposition': 'attachment; filename=' + fileName
        }
      }
      let writer = new XLSXWriter(fileName, {})
      let wirteStream = fs.createWriteStream(fileName)

// After instantiation, you can grab the readstream at any time.
      writer.getReadStream().pipe(wirteStream)
      for (let i of rs) {
        writer.addRow(i)
      }
      writer.finalize()
      wirteStream.on('finish', function () {
        // finish
        res.sendFile(currFilePath, options, function () {
          if (err) {
            console.log(err)
            res.sendFile(path.join(process.cwd(), 'error.html'))
            return
          } else {
            console.log('Sent:', fileName)
            fs.unlink(currFilePath, function (err) {
              if (err) console.log(err)
              console.log('文件删除成功')
            })
          }
        })
      })
    }, 180000)
  }
}
