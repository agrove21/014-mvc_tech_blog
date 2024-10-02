const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = [ 
    {
        username: 'firstUser',
        password: 'password123',
    },
    {
        username: 'secondUser',
        password   : 'password123',
    },
    {
        username: 'thirdUser',
        password: 'password123',    
    },
];

const seedUsers = async () => await User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;     