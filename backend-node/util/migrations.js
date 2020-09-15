const User = require('../model/User')

const migrate = () => {
    User.sync().then(r => console.log('table user created'))
}

module.exports = migrate
