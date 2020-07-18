var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    //Render toward folder view file named index
    res.render('index', { title: 'Blockchain'});
  });
  

module.exports = router;