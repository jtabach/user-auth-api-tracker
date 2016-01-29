//http://api.sportradar.us/nhl-t1/games/2015/reg/schedule.json?api_key=[your_api_key]




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
