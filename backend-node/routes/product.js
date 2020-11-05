const express = require('express')
const router = express.Router()
const productController = require('../controller/product')
const authMiddleware = require('../middleware/auth')

router.use('/', authMiddleware.checkJWT)

router.get('/', productController.listProducts)

router.get('/:id', productController.getProduct)

router.get('/categories', productController.listCategoriesWithProducts)

router.post('/', productController.saveProduct)

// router.put('/:id', productController.editProduct)

router.delete('/:id', productController.deleteProduct)

module.exports = router