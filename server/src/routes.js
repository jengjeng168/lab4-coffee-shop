<<<<<<< HEAD
// src/routes.js
const CoffeeController = require('./controllers/CoffeeController')

module.exports = (app) => {
    // เส้นทางสำหรับจัดการเมนูกาแฟ (Coffee Routes)
    app.get('/coffees', CoffeeController.index)      // ดูเมนูทั้งหมด
    app.post('/coffee', CoffeeController.create)     // เพิ่มเมนู
    app.put('/coffee/:coffeeId', CoffeeController.put) // แก้ไขเมนู
    app.delete('/coffee/:coffeeId', CoffeeController.remove) // ลบเมนู
    app.get('/coffee/:coffeeId', CoffeeController.show) // ดูเมนูรายตัว
}   
=======
const DrinkController = require('./controllers/DrinkController')
 
module.exports = (app) => {
 
    // get all drinks
    app.get('/drinks', DrinkController.index)
 
    // get drink by id
    app.get('/drink/:id', DrinkController.show)
 
    // create drink
    app.post('/drink', DrinkController.create)
 
    // update drink
    app.put('/drink/:id', DrinkController.update)
 
    // delete drink
    app.delete('/drink/:id', DrinkController.delete)
}
>>>>>>> 9ea1d392c71edf2b79be8b4ed72e78029637f61f
