// Route is layer for first request and final response

var express = require('express');
var router = express.Router();

var authController = require('../../controller/authController');

router.post('/register', function(req, res, next) {
  authController.registerUser(req.body).
      then(function (data) {
          res.status(200).json( { status : 200, data : data } )
      });
});

router.get('/me', function(req, res, next) {
  var token = null;
  token = req.headers['x-access-token'];
  
  authController.me(token)
      .then(function (data) {
          res.status(200).json( { status : 200, data : data } )
      })
      .catch(function (err){
        console.log(err);
          res.status(401).json( { status : 401, err : err } )
      });
});


module.exports = router;