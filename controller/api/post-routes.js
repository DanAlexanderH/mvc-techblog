const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../helpers/auth');


router.get('/', async (req,res) => {
    try {
        const allPost = await Post.findAll({
            attributes: ['id', 'title', 'postText'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'post_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        res.status(200).json(allPost)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const singlePost = await Post.findOne({
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
                    attributes: ['id', 'comment', 'post_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        if(!singlePost) {
            res.status(404).json({ message: 'No Post with this ID!'});
            return
        } else {
            res.status(200).json(singlePost)
        }
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            postText: req.body.postText,
            user_id: req.body.user_id
        })

        res.status(200).json(newPost)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update(
            {
                title: req.body.title,
                postText: req.body.postText
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        if(!updatePost) {
            res.status(404).json({ message: "No Post with this ID!"})
            return;
        } else {
            res.status(200).json(updatePost)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        if(!deletePost) {
            res.status(404).json({ message: "No Post with this ID!"});
            return
        } else {
            res.status(200).json(deletePost)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

module.exports = router;