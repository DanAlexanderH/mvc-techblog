const { User } = require('../models');

const userData = [
    {
        username: 'Danny',
        password: 'mindybear'
    },
]
const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;