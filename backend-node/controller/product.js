const Product = require('../model/Product')
const Category = require('../model/Category')

exports.listProducts = (req, res, next) => {
    Product.findAll({
        attributes: ['id', 'name', 'categoryId'],
        // include: Category

    }).then(products => res.send(products))
}



exports.getProduct = (req, res, next) => {
    const productId = req.params.id
    Product.findOne({
        attributes: ['id', 'name', 'categoryId'],
        // include: Category
        where: {
            id: productId
        }

    }).then(product => res.send(product))
}

exports.listCategoriesWithProducts = (req, res, next) => {
    Category.findAll({
        attributes: ['id', 'name'],
        include: Product
    }).then(categories => res.send(categories))
}

exports.saveProduct = (req, res, next) => {
    const id = req.body.id
    if(id){
        editProduct(req, res, next)
    }else {
        saveNewProduct(req, res, next)
    }

}

const saveNewProduct = (req, res, next) => {
    const name = req.body.name
    const categoryId = req.body.category
    Product.create({
        name,
        categoryId
    }).then(product => res.send({
        ...product.dataValues,
        message: 'Product created'
    })).catch(e => {
        console.log(e)
        res.status(501).send({
            message: e.name
        })
    })
}

const editProduct = (req, res, next) => {
    const id = req.body.id
    const name = req.body.name
    const categoryId = req.body.category

    Product.update(
        {
            name,
            categoryId
        }
        ,{returning: true, where: {id}}).then((product) => {
        res.send({
            ...product[1][0].dataValues,
            message: 'Product changed'
        })
    }).catch(e => {
        console.log(e)
        res.status(501).send({
            message: e.code
        })
    })
    
}


exports.deleteProduct = (req, res, next) => {
    const id = req.params.id

    Product.destroy({
        where: { id }
    }).then(() => res.send({
        message: 'Product deleted'
    }))

}