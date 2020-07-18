var router = require('express').Router();

router.use('/', require('./index'));
router.use('/', require('./authentication'));
router.use('/', require('./user'));

module.exports = router;
