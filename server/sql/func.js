let mysql = require('mysql')
let db = require('../config/db')
let pool1 = mysql.createPool(db.report)
let pool2 = mysql.createPool(db.xianjinkd)

module.exports = {
  connPool1 (sql, val, cb) {
    pool1.getConnection((err, conn) => {
      if (err) {
        console.log(err)
        throw new Error(err)
      }
      let q = conn.query(sql, val, (err, rows) => {
        if (err) {
          console.log(err)
          throw new Error(err)
        }
        cb(err, rows)
        conn.release()
      })
    })
  },
  connPool2 (sql, val, cb) {
    pool2.getConnection((err, conn) => {
      if (err) {
        console.log(err)
        throw new Error(err)
      }
      let q = conn.query(sql, val, (err, rows) => {
        if (err) {
          console.log(err)
          throw new Error(err)
        }
        cb(err, rows)
        conn.release()
      })
    })
  },

  // json格式
  writeJson (res, code = 200, msg = 'ok', data = null) {
    let obj = {code, msg, data}

    if (!data) {
      delete obj.data
    }
    res.send(obj)
  }
}
