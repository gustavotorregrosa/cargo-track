const express = require('express')
const router = express.Router()
const categoryController = require('../controller/category')

router.get('/', categoryController.listCategories)

router.post('/', categoryController.saveNewCategory)

router.put('/:id', categoryController.editCategory)

router.delete('/:id', categoryController.deleteCategory)

module.exports = router