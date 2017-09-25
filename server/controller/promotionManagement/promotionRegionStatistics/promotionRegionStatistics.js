let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let moment = require('moment')
let tableName = require('../../../config/tableName')
let {analysis, formatCurrency, formatInt, handleProperty, handleTime, combine} = require('../../../utils/utils')
let shell = require('../../../config/shell')
let process = require('child_process')

global.regionCount = 0

function formatData (rows) {
  return rows.map(row => {
    if (row.d_date) {
      row.d_date = moment(row.d_date).format('YYYY-MM-DD')
    }
    if (row.Pass_rate) {
      row.Pass_rate = (row.Pass_rate * 100).toFixed(2) + '%'
    }

    if (row.register_num) {
      row.register_num = formatInt(row.register_num)
    }
    if (row.realname_auth_num) {
      row.realname_auth_num = formatInt(row.realname_auth_num)
    }
    if (row.card_bound_num) {
      row.card_bound_num = formatInt(row.card_bound_num)
    }
    if (row.emergency_contact_num) {
      row.emergency_contact_num = formatInt(row.emergency_contact_num)
    }
    if (row.operator_auth_num) {
      row.operator_auth_num = formatInt(row.operator_auth_num)
    }
    if (row.Alipay_auth_num) {
      row.Alipay_auth_num = formatInt(row.Alipay_auth_num)
    }
    if (row.Sesame_auth_num) {
      row.Sesame_auth_num = formatInt(row.Sesame_auth_num)
    }
    if (row.jobinfo_auth_num) {
      row.jobinfo_auth_num = formatInt(row.jobinfo_auth_num)
    }
    if (row.apply_loan_num) {
      row.apply_loan_num = formatInt(row.apply_loan_num)
    }
    if (row.apply_succ_num) {
      row.apply_succ_num = formatInt(row.apply_succ_num)
    }
    if (row.loan_amount) {
      row.loan_amount = formatCurrency(row.loan_amount)
    }
    if (row.blacklist_num) {
      row.blacklist_num = formatInt(row.blacklist_num)
    }
    if (row.overdue_num) {
      row.overdue_num = formatInt(row.overdue_num)
    }
    return row
  })
}

module.exports = {
  //每日还款金额数据
  fetchAll (req, res) {
    let params = req.body
    if (params.options.province === '全国') {
      params.options.province = ''
    }
    if (params.options.city === '全国' || params.options.city === '全部') {
      params.options.city = ''
    }
    let queries = handleProperty(params.options)
    let timeOption = 'd_date'
    if( params.endTime != '') {
      timeOption = ' date_format( ' + timeOption + ' ,\'%Y-%m-%d\') '
    }
    let timeLimit = handleTime(timeOption, params.startTime, params.endTime)
    let combined = combine(queries, timeLimit)
    let order
    if (params.order) {
      order = params.order
    } else {
      order = sql.promotionManagement.promotionRegionStatistics.order
    }
    let query = sql.promotionManagement.promotionRegionStatistics.selectAllFront + combined + order + sql.promotionManagement.promotionRegionStatistics.selectAllBack
    func.connPool1(query, [tableName.promotionRegionStatistics, params.offset, params.limit], function (err, rs) {
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
    if (params.options.province === '全国') {
      params.options.province = ''
    }
    if (params.options.city === '全国' || params.options.city === '全部') {
      params.options.city = ''
    }
    let queries = handleProperty(params.options)
    let timeOption = 'd_date'
    if( params.endTime != '') {
      timeOption = ' date_format( ' + timeOption + ' ,\'%Y-%m-%d\') '
    }
    let timeLimit = handleTime(timeOption, params.startTime, params.endTime)
    let combined = combine(queries, timeLimit)
    let query = sql.promotionManagement.promotionRegionStatistics.getCount + combined
    func.connPool1(query, [tableName.promotionRegionStatistics], function (err, rs) {
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
    if (global.regionCount === 0) {
      global.regionCount++
      process.exec(shell.promotionRegionStatistics, function (error, stdout, stderr) {
        if (error !== null) {
          console.log('exec error: ' + error)
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 推广统计(地区)shell脚本执行失败')
          res.json({code: '500'})
          global.regionCount = 0
        } else {
          console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 推广统计(地区)shell脚本执行成功')
          res.json({code: '200'})
          global.regionCount = 0
        }
      })
      console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' 推广统计(地区)开始执行shell脚本')
    } else {
      res.json({code: '400'})
    }
  }
}
