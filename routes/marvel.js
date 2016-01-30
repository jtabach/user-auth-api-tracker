// ddb1730843a0168c7d771db9a99a1499

// 3d08dd81101ddeded33c328809f4d09f6392f601

var express = require('express');
var md5 = require('md5');
var request = require('request');
var router = express.Router();

var authMiddleware = require('../config/auth');

router.use(authMiddleware);

/* GET home page. */
router.get('/', function(req, res, next) {
	// if(req.user){
	return  res.render('marvel', req.user);

		
	// }
	// res.redirect('login');
});

router.get('/character', function(req, res, next) {
	var ts = Date.now();
	var hash = md5(ts+'3d08dd81101ddeded33c328809f4d09f6392f601'+'ddb1730843a0168c7d771db9a99a1499')
	console.log('ts:', ts)
	console.log('hash:', hash);
	var url = `http://gateway.marvel.com:80/v1/public/characters/1009610?ts=${ts}&apikey=ddb1730843a0168c7d771db9a99a1499&hash=${hash}`;

	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
		    res.send(JSON.parse(body)); 
		  } else {
		  	console.log('wtf');
		  }
	});
});

router.post('/', function(req, res, next) {
  console.log('Get char');
});

module.exports = router;
