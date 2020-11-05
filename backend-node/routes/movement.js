const express = require('express')
const router = express.Router()
const movementController = require('../controller/movement')
const authMiddleware = require('../middleware/auth')

router.use('/', authMiddleware.checkJWT)

router.get('/:productId', movementController.listMovements)

router.get('/positions/:productId', movementController.listPositions)

router.post('/', movementController.createMovement)

router.delete('/:productId', movementController.deleteMovement)

module.exports = router
