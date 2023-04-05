const { Comment } = require('../models');

const commentData = [
    {
        comment: 'First Comment',
        user_id: 1,
        post_id: 1,
    },
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;