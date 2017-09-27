let sql = require('../../../sql/sqlMap')
let func = require('../../../sql/func')
let tableName = require('../../../config/tableName')

function formatProperty (rs) {
  let a = []
  let b = []
  let result = {}
  let keys = Object.keys(rs[0])
  rs.map(r => {
    a.push(r[keys[0]])
    b.push(r[keys[1]])
  })
  result.a = a
  result.b = b
  return result
}

function formatRatio (rs) {
  if (rs.dr_tgl) {
    rs.dr_tgl = rs.dr_tgl.toFixed(2) + '%'
  }
  if (rs.rtb_tgl) {
    rs.rtb_tgl = rs.rtb_tgl.toFixed(2) + '%'
  }
  if (rs.zhb_tgl) {
    rs.zhb_tgl = rs.zhb_tgl.toFixed(2) + '%'
  }
  if (rs.yhb_tgl) {
    rs.yhb_tgl = rs.yhb_tgl.toFixed(2) + '%'
  }
  if (rs.day7_avg_tgl) {
    rs.day7_avg_tgl = rs.day7_avg_tgl.toFixed(2) + '%'
  }
  if (rs.day30_avg_tgl) {
    rs.day30_avg_tgl = rs.day30_avg_tgl.toFixed(2) + '%'
  }
  return rs
}

function formatCompare (rs) {
  let a = []
  let b = []
  let c = []
  let d = []
  let arr = [a, b, c, d]
  for (let i = 0; i < rs.length; i++) {
    arr[i] = Object.values(rs[i]).slice(2)
  }
  return arr
}

function formatHours (rs) {
  return Object.values(rs[0])
}

module.exports = {
  getDaily (req, res) {
    let query = sql.RMAB.newUserPassRateRatio.tab1.dailySelect
    func.connPool1(query, tableName.newUserPassRateRatio, function (err, rs) {
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
      res.json(formatProperty(rs))
    })
  },
  getHoursly (req, res) {
    let query = sql.RMAB.newUserPassRateRatio.tab1.hoursSelect
    func.connPool1(query, tableName.newUserPassRateRatio, function (err, rs) {
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
      res.json(formatHours(rs))
    })
  },
  getweekly (req, res) {
    let query = sql.RMAB.newUserPassRateRatio.tab1.weeklySelect
    func.connPool1(query, tableName.newUserPassRateRatio, function (err, rs) {
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
      res.json(formatProperty(rs))
    })
  },
  getMonthly (req, res) {
    let query = sql.RMAB.newUserPassRateRatio.tab1.monthlySelect
    func.connPool1(query, tableName.newUserPassRateRatio, function (err, rs) {
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
      res.json(formatProperty(rs))
    })
  },
  getRatio (req, res) {
    let query = sql.RMAB.newUserPassRateRatio.tab1.getRatio
    func.connPool1(query, tableName.newUserPassRateRatio, function (err, rs) {
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
      res.json(formatRatio(rs[0]))
    })
  },
  compare (req, res) {
    let date = req.body.date
    let query = sql.RMAB.newUserPassRateRatio.tab1.compare
    func.connPool1(query, [date, date], function (err, rs) {
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
      res.json(formatCompare(rs))
    })
  }
}
