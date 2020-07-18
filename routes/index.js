var router = require('express').Router();

router.use('/', require('./uipage'));
router.use('/', require('./authentication'));
router.use('/', require('./user'));

module.exports = router;
