// src/routes.js

const CoffeeController = require('./controllers/CoffeeController')
const UserController = require('./controllers/UserController')
const UserAuthenController = require('./controllers/UserAuthenController')
const isAuthenController = require('./controllers/isAuthenController')
const BlogController = require('./controllers/BlogController')

// ===============================
// Upload (Blog)
// ===============================
const UploadController = require('./controllers/UploadController')
const fileUploadMiddleware = require('./middleware/fileUpload')

// ===============================
// Coffee Upload (รูปกาแฟอย่างเดียว)
// ===============================
const coffeeUpload = require('./middleware/coffeeUpload')

module.exports = (app) => {

  // ===============================
  // Auth Routes
  // ===============================
  app.post('/login', UserAuthenController.login)
  app.post('/register', UserAuthenController.register)

  // ===============================
  // Users Routes
  // ===============================
  app.get('/users', isAuthenController, UserController.index)
  app.get('/user/:userId', isAuthenController, UserController.show)
  app.post('/user', isAuthenController, UserController.create)
  app.put('/user/:userId', isAuthenController, UserController.put)
  app.delete('/user/:userId', isAuthenController, UserController.remove)

  // ===============================
  // Coffee Routes (ข้อมูลอย่างเดียว)
  // ===============================
  app.get('/coffees', CoffeeController.index)
  app.get('/coffee/:coffeeId', CoffeeController.show)

  app.post('/coffee', isAuthenController, CoffeeController.create)
  app.put('/coffee/:coffeeId', isAuthenController, CoffeeController.update)
  app.delete('/coffee/:coffeeId', isAuthenController, CoffeeController.delete)

  // ===============================
  // Blog Routes
  // ===============================
  app.post('/blog', BlogController.create)
  app.put('/blog/:blogId', BlogController.put)
  app.delete('/blog/:blogId', BlogController.remove)
  app.get('/blog/:blogId', BlogController.show)
  app.get('/blogs', BlogController.index)

  // ===============================
  // Upload Route (Blog)
  // ===============================
  app.post('/upload', fileUploadMiddleware, UploadController.upload)

  // ===============================
  // Coffee Upload Route (อัปโหลดรูปอย่างเดียว)
  // ===============================
  app.post('/coffee-upload', coffeeUpload, (req, res) => {
    console.log('UPLOAD FILE =>', req.file) // 👈 log ไว้ดูใน Terminal

    if (!req.file) {
      return res.status(400).send({ error: 'No file uploaded' })
    }

    res.json({ filename: req.file.filename })
  })
}