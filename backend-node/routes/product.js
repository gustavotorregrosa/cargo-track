const express = require('express')
const router = express.Router()
const productController = require('../controller/product')



router.get('/', productController.listProducts)

router.get('/categories', productController.listCategoriesWithProducts)

router.post('/', productController.saveProduct)

// router.put('/:id', productController.editProduct)

router.delete('/:id', productController.deleteProduct)

module.exports = router