// Route is layer for first request and final response

var express = require('express');
var router = express.Router();
var userController = require('../../controller/userController');

router.post('/create/', function(req, res, next) {
    userController.createUser(req.body).
        then(function (status) {
            res.status(200).json( {"status": status } )
        });
});


module.exports = router;