const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../helpers/auth');

router.get('/', async (req, res) => {
    try {
        const allUser = await User.findAll({
            attributes: {exclude: ['password']}
        })

        res.status(200).json(allUser)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const singleUser = await User.findOne({
            where:{ id: req.params.id},
            attributes: {exclude: ['password']},
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'postText']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment']
                }
            ]
        })

        if(!singleUser) {
            res.status(404).json({ message : "No User with this ID!"});
            return
        } else {
            res.status(200).json(singleUser)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.post('/', async (req, res) => {
try {
    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password
    })
    console.log(newUser)
    res.status(200).json(newUser)
} catch (err) {
    console.log(err)
    res.status(500).json(err)
}
});
//login user
router.post('/login', async (req, res) => {
    try {
        console.log(req.body.username)
        const loginUser = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        if(!loginUser) {
            res.status(400).json({ message: "Incorrect Username or Password!"});
            return
        } 
        const userPassword = loginUser.checkPassword(req.body.password);
        if(!userPassword) {
            res.status(400).json({ message: "Incorrect Username or Password!"});
            return;
        }

        req.session.save(() => {
            req.session.user_id = loginUser.id;
            req.session.username = loginUser.username;
            req.session.logged_in = true;
            res.json({ user: loginUser, message: "Yoy are logged in!"})
        })

        } catch(err) {
            console.log(err)

        } 
});

//logout user
router.post('/logout', async (req, res) => {
    try {
        if(req.session.logged_in) {
            res.session.destroy(() => {
                res.status(204).end();
            })
        } else {
            res.status(404).end();
        }
    } catch (err) {
        console.log(err)
    }
});

//update user
router.put('/:id', async (req, res) => {
    try {
        const updUser = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        if(!updUser) {
        res.status(404).json({ message: 'No User with this ID!'});
        return
        } else {
            res.status(200).json(updUser)
        }
    } catch(err) {
        console.log(err)
    } 
});

//delete user 
router.delete('/:id', async (req, res) => {
    try {
        const deleteUser = await User.destroy({
            where: {
                id: req.params.id
            }
        })
        if(!deleteUser) {
            res.status(404).json({ message: 'No User with this ID!'});
            return
        } else {
            res.status(200).json(deleteUser)
        }
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;