const { Post } = require('../models');

const postData = [
    {
        title: 'First Post',
        content: 'This is a test post', 
        user_id: 1,
    },
    {
        title: 'Second Post',
        content: 'This is another test post',
        user_id: 2,
    },
    {
        title: 'Third Post',
        content: 'This is a third test post',
        user_id: 3, 
    },
];

const seedPosts = async () => await Post.bulkCreate(postData, {individualHooks: true});

module.exports = seedPosts;
