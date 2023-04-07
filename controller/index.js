const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoute = require('./homeRoute');
const dashboardRoute = require('./dashboardRoute');

router.use('/api', apiRoutes);
router.use('/', homeRoute);
router.use('/dashboard', dashboardRoute);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;