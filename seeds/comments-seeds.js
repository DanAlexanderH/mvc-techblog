const { Comment } = require('../models');

const commentData = [
    {
        comment: 'First Comment',
        user_id: 2,
        post_id: 2,
    },
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;