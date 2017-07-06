/**
 * Created by Administrator on 2017/6/27.
 */
var models = require('../db/db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../db/sqlMap')
var moment = require('moment')
const jwt = require('jwt-simple')
const app = express()

app.set('jwtTokenSecret', 'tokenContent')

var expires = moment().add(7, 'days').calendar().valueOf()

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// 查询customers接口
router.post('/cashManage', (req, res) => {
  var select = $sql.customers.select
  // var params = req.body
  // console.log(params)
  // conn.query(customers, [params.name, params.price])
  conn.query(select, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 查询funds接口
router.post('/fundProduct', (req, res) => {
  var select = $sql.funds.select
  // var params = req.body
  // console.log(params)
  // conn.query(customers, [params.name, params.price])
  conn.query(select, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 登录验证
router.post('/login', (req, res) => {
  var select = $sql.user.select
  var params = req.body
  conn.query(select, params.name, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      let rightPassword = result[0].password
      var token = jwt.encode({
        iss: result[0].level,
        exp: expires
      }, app.get('jwtTokenSecret'))
      console.log(rightPassword)
      if (rightPassword === params.password) {
        res.json(token)
      } else {
        res.json(1)
      }
    }
  })
})

module.exports = router
