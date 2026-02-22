const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ===============================
// เปิด Static Folder สำหรับรูปกาแฟ
// ===============================
app.use(
  '/uploads',
  express.static(path.join(__dirname, '../public/uploads'))
)

// ===============================
// เปิด static assets อื่น ๆ
// ===============================
app.use(
  '/assets',
  express.static(path.join(__dirname, '../public'))
)

require('./routes')(app)
require('./userPassport')

const config = require('./config/config')

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`)
})