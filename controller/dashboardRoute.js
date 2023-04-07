const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../helpers/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },

            attributes: ['id', 'title', 'postText'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['comment', 'id', 'post_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', { 
            posts,
            loggedIn: true
     })
    
    } catch( err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const editPost = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'title', 'postText'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'user_id', 'post_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        if(!editPost) {
            res.status(404).json({ message: "No post with this ID!"});
            return;
        } else {
            const post = editPost.get({ plain: true });
            res.render('update-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});


router.get('/new', (req, res) => {
    res.render('new-post')
});

module.exports = router;
