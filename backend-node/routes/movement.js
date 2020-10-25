const express = require('express')
const router = express.Router()
const movementController = require('../controller/movement')

router.get('/:productId', movementController.listMovements)

router.post('/', movementController.createMovement)

router.delete('/:productId', movementController.deleteMovement)

module.exports = router
