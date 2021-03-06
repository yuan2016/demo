let sql = require('../../sql/sqlMap')
let func = require('../../sql/func')
let moment = require('moment')
let express = require('express')
let tableName = require('../../config/tableName')
let jwt = require('jwt-simple')

let app = express()

app.set('jwtTokenSecret', 'tokenContent')

let expires = moment().add(7, 'days').calendar().valueOf()

function judgment (rs, password) {
  let result
  if (rs.length !== 0) {
    let realPwd = rs[0].user_password
    if (realPwd === password) {
      let token = jwt.encode({
        iss: password,
        exp: expires
      }, app.get('jwtTokenSecret'))
      result = token
    } else {
      result = 300
    }
  } else {
    result = 400
  }
  return result
}

module.exports = {
  //登录验证
  login (req, res) {
    let params = req.body
    let query = sql.login.select
    func.connPool1(query, [tableName.login, params.email], function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
      }
      let result = judgment(rs, params.password)
      let final = {token: result, name: rs[0].user_name, availableTable: rs[0].available_table}
      res.json(final)
    })
  },
  getRoles (req, res) {
    let params = req.body
    let query = sql.login.select
    func.connPool1(query, [tableName.login, params.email], function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
      }
      res.json(rs)
    })
  }
}
/**
 * Created by Administrator on 2017/7/10.
 */
