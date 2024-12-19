const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')

router.get('/getProducts', productsController.getAllProducts)
router.get('/getProduct/:id', productsController.getProductById)
router.post('/createProduct', productsController.createProduct)
router.patch('/updateProduct/:id', productsController.updateProductById)
router.delete('/deleteProduct/:id', productsController.deleteProductById)

module.exports = router;