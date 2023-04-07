const router = require('express').Router();
const { Comment, Post, User } = require('../models');



router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
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
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    
    } catch( err) {
        console.log(err)
        res.status(400).json(err)
    }
});

router.get('/login', async (req, res) => {
    try {
        if(req.session.logged_in) {
            res.redirect('/');
            return
        } else {
            res.render('login')
        }
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const onePost = await Post.findOne({
            where: {id: req.params.id},
            attributes: ['id', 'title', 'postText', 'user_id'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                },
            ],
        }); 
        if(!onePost) {
            res.status(404).json({ message: 'There is no post with this ID!'});
            return
        } else {
            res.status(200).json(onePost)
        }
        
        const post = onePost.get({ plain: true });

        res.render('post', {
            post,
            logged_in: req.session.logged_in
        });
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
});

module.exports = router;




