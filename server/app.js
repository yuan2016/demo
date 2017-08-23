let express = require('express')
let bodyParser = require('body-parser')
let path = require('path')
let router = require('./route/router.js')

let port = process.env.PORT || 80
let app = express()

app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(router)

let server = app.listen(port, () => {
  console.log(`devServer start on port:${port}`)
})

server.setTimeout(1000 * 60 * 30)
