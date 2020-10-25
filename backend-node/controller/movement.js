const Movement = require('../model/Movement')

exports.createMovement = (req, res, next) => {
    Movement.create({
        productId: req.body.productID,
        type: req.body.type,
        dueDate: req.body.date,
        amount: req.body.amount
    }).then(movement => res.send({
        ...movement.dataValues,
        message: 'Movement created'
    }))
}

exports.listMovements = (req, res, next) => {
    const productId = req.params.productId
    Movement.findAll({
        attributes: ['id', 'productId', 'type', 'dueDate', 'amount'],
        order: ['dueDate'],
        where: {
            productId
        }
    }).then(moviments => res.send({moviments}))
}

exports.deleteMovement = (req, res, next) => {
    const id = req.params.productId

    Movement.destroy({
        where: { id }
    }).then(() => res.send({
        message: 'Movement deleted'
    }))
}