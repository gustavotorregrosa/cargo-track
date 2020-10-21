const User = require('../model/User')
const Category = require('../model/Category')
const Product = require('../model/Product')
const Movement = require('../model/Movement')

const migrate = () => {
    User.sync().then(r => console.log('table user created'))
    Category.sync().then(r => 
        {
            console.log('table category created')
            Product.sync().then(r => {
                console.log('table product created')
                Movement.sync().then(r => {
                    console.log('table movement created')
                })
            })
        }
    )
        
    

}

module.exports = migrate
