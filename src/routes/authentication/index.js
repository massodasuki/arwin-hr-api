var router = require('express').Router();

router.use('/', require('./authRoute'));

module.exports = router;