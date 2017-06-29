/**
 * Created by Administrator on 2017/6/27.
 */
var models = require('../db/db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../db/sqlMap')

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

// 查询customers城市
router.post('/cashManage?city', (req, res) => {
  var select = $sql.customers.city
  // var params = req.body
  // console.log(params)
  // conn.query(customers, [params.name, params.price])
  conn.query(select, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
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

module.exports = router
