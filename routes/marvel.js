// ddb1730843a0168c7d771db9a99a1499

// 3d08dd81101ddeded33c328809f4d09f6392f601

var express = require('express');
var md5 = require('md5');
var request = require('request');
var router = express.Router();


var User = require('../models/user');

var authMiddleware = require('../config/auth');

router.use(authMiddleware);

/* GET home page. */
router.get('/', function(req, res, next) {
	// if(req.user){
	return  res.render('marvel', req.user);

		
	// }
	// res.redirect('login');
});

router.get('/show', function(req, res, next) {
	res.render('marvel');
});

router.get('/character', authMiddleware, function(req, res, next) {
	console.log(req.user._id);
	var ts = Date.now();
	var hash = md5(ts+'3d08dd81101ddeded33c328809f4d09f6392f601'+'ddb1730843a0168c7d771db9a99a1499')
	var url = `http://gateway.marvel.com:80/v1/public/characters/1009610?ts=${ts}&apikey=ddb1730843a0168c7d771db9a99a1499&hash=${hash}`;

	request(url, function(error, response, body) {
		var data = JSON.parse(body).data.results["0"];
		if (!error && response.statusCode == 200) {
			User.findById(req.user._id, function(err, user) {
				user.character.push({
					name: data.name,
					image: data.thumbnail.path+".jpg",
					description: data.description,
					moreinfo: data.urls[2].url
				});
				user.save(function(err, updateUser) {
					res.send(updateUser.character);
				});
			});
		  } else {
		  	console.log('wtf');
		  }
	});
});

router.post('/', function(req, res, next) {
  console.log('Get char');
});

module.exports = router;
