const { Post } = require('../models');

const postData = [
    {
        title: 'Post One',
        user_id: 1,
        
    },
]
const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;