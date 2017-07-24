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
  console.log(rs.length)
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
  fetchAll (req, res) {
    let params = req.body
    console.log(params)
    let query = sql.login
    console.log(query)
    console.log(params.email)
    console.log(tableName.login)
    func.connPool1(sql.login.select, [tableName.login, params.email], function (err, rs) {
      if (err) {
        console.log('[query] - :' + err)
        throw new Error(err)
      }
      console.log(rs)
      let result = judgment(rs, params.password)
      res.json(result)
    })
  }
}
/**
 * Created by Administrator on 2017/7/10.
 */
