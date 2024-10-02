const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

const commentData = [
    {
        body: 'This is a test comment',
        post_id: 1,
        user_id: 3,
    },
    {
        body: 'This is another test comment',
        post_id: 2,
        user_id: 1,
    },
    {
        body: 'This is a third test comment',
        post_id: 3,
        user_id: 2,
    },
];

const seedComments = async () => await Comment.bulkCreate(commentData);

module.exports = seedComments;