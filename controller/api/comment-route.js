const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../helpers/auth');

router.get('/', async (req, res) => {
    try{
        const allComments = await Comment.findAll();
        res.json(allComments)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
});

router.post('/', withAuth, async (req,res) => {
    try {
        if(req.session) {
            const newComment = await Comment.create({
                comment: req.body.comment,
                post_id: req.body.post_id,
                user_id: req.session.user_id
            })

            res.status(200).json(newComment)
        }
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        if(!deleteComment) {
            res.status(404).json({ message: 'No Comment with this ID!'});
            return
        } else {
            res.json(deleteComment);
        }
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
});


module.exports = router;