const Category = require('../model/Category')

exports.listCategories = (req, res, next) => {
    Category.findAll({
        attributes: ['id', 'name']
    }).then(categories => res.send(categories))
}

exports.saveNewCategory = (req, res, next) => {
    const name = req.body.name
    Category.create({
        name
    }).then(category => res.send({
        ...category.dataValues,
        message: 'Category created'
    })).catch(e => {
        console.log(e)
        res.status(501).send({
            message: e.errors[0].message
        })
    })
}

exports.editCategory = (req, res, next) => {
    const id = req.params.id
    const name = req.body.name

    Category.update({name},{returning: true, where: {id}}).then((category) => {
        res.send({
            ...category[1][0].dataValues,
            message: 'Category changed'
        })
    }).catch(e => {
        console.log(e)
        res.status(501).send({
            message: e.code
        })
    })
    
}

exports.deleteCategory = (req, res, next) => {
    const id = req.params.id

    Category.destroy({
        where: { id }
    }).then(() => res.send({
        message: 'Category deleted'
    }))

}

