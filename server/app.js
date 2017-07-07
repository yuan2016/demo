let express = require('express')
let bodyParser = require('body-parser')
let path = require('path')
let router = require('./route/router.js')

let port = process.env.PORT || 3000
let app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(router)

app.listen(port, () => {
  console.log(`devServer start on port:${port}`)
})
