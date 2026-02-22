const { Coffee } = require('../models')
const fs = require('fs')
const path = require('path')

module.exports = {

  // ===============================
  // ดึงรายการกาแฟทั้งหมด
  // ===============================
  async index (req, res) {
    try {
      const coffees = await Coffee.findAll()
      res.send(coffees)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  // ===============================
  // ดูรายละเอียดกาแฟ
  // ===============================
  async show (req, res) {
    try {
      const coffee = await Coffee.findByPk(req.params.coffeeId)

      if (!coffee) {
        return res.status(404).send({ message: 'Coffee not found' })
      }

      res.send(coffee)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  // ===============================
  // เพิ่มเมนูกาแฟใหม่ (รองรับอัปโหลดรูป)
  // ===============================
  async create (req, res) {
    try {
      const {
        name,
        price,
        type,
        status,
        description
      } = req.body

      let image = null

      // 👉 รับไฟล์จาก multer
      if (req.file) {
        image = `/uploads/${req.file.filename}`
      }

      const coffee = await Coffee.create({
        name,
        price,
        type,
        status,
        description,
        image
      })

      res.send({
        message: 'Uploaded Successfully!',
        coffee
      })
    } catch (err) {
      console.error(err)
      res.status(400).send({
        error: 'Upload Failed'
      })
    }
  },

  // ===============================
  // แก้ไขข้อมูลกาแฟ (ถ้ามีรูปใหม่ จะเปลี่ยนรูป)
  // ===============================
  async update (req, res) {
    try {
      const coffee = await Coffee.findByPk(req.params.coffeeId)

      if (!coffee) {
        return res.status(404).send({ message: 'Coffee not found' })
      }

      const {
        name,
        price,
        type,
        status,
        description
      } = req.body

      // 👉 ถ้ามีการอัปโหลดรูปใหม่
      if (req.file) {
        // ลบรูปเก่า
        if (coffee.image) {
          const oldPath = path.join(__dirname, '../../public', coffee.image)
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath)
          }
        }
        coffee.image = `/uploads/${req.file.filename}`
      }

      await coffee.update({
        name,
        price,
        type,
        status,
        description,
        image: coffee.image
      })

      res.send({ message: 'Coffee updated successfully' })
    } catch (err) {
      console.error(err)
      res.status(400).send({
        error: 'Update Failed'
      })
    }
  },

  // ===============================
  // ลบเมนูกาแฟ (ลบรูปด้วย)
  // ===============================
  async delete (req, res) {
    try {
      const coffee = await Coffee.findByPk(req.params.coffeeId)

      if (!coffee) {
        return res.status(404).send({ message: 'Coffee not found' })
      }

      // 👉 ลบไฟล์รูปออกจากโฟลเดอร์
      if (coffee.image) {
        const imgPath = path.join(__dirname, '../../public', coffee.image)
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath)
        }
      }

      await coffee.destroy()

      res.send({ message: 'Coffee deleted successfully' })
    } catch (err) {
      console.error(err)
      res.status(400).send({
        error: 'Delete Failed'
      })
    }
  }

}