// ddb1730843a0168c7d771db9a99a1499

// 3d08dd81101ddeded33c328809f4d09f6392f601

var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

router.use(authMiddleware);

/* GET home page. */
router.get('/', function(req, res, next) {
	// if(req.user){
	return  res.render('pokemon', req.user);
		
	// }
	// res.redirect('login');
});

router.post('/', function(req, res, next) {
  // add pokemon to user
});

module.exports = router;
