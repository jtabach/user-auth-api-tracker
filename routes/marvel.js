// ddb1730843a0168c7d771db9a99a1499

// 3d08dd81101ddeded33c328809f4d09f6392f601

var express = require('express');
var md5 = require('md5');
var request = require('request');
var router = express.Router();


var User = require('../models/user');
var List = require('../models/list');

var authMiddleware = require('../config/auth');

router.use(authMiddleware);

router.get('/', function(req, res, next) {
	return  res.render('marvel', req.user);
});

router.get('/', function(req, res, next) {
	res.render('marvel');
});

router.get('/characters', function(req, res) {
	User.findById(req.user._id, function(err, user) {
		res.send(user.character);

	});
})

router.post('/character', authMiddleware, function(req, res, next) {
	var charId = req.body.id;
	var ts = Date.now();
	var hash = md5(ts+'3d08dd81101ddeded33c328809f4d09f6392f601'+'ddb1730843a0168c7d771db9a99a1499')
	var url = `http://gateway.marvel.com:80/v1/public/characters/${charId}?ts=${ts}&apikey=ddb1730843a0168c7d771db9a99a1499&hash=${hash}`;

	
    
	request(url, function(error, response, body) {
		var data = JSON.parse(body).data.results["0"];
		if (!error && response.statusCode == 200) {
			User.findById(req.user._id, function(err, user) {
				try {
				user.character.push({
					name: data.name,
					image: data.thumbnail.path+".jpg",
					description: data.description,
					moreinfo: (data.urls[2]) ? data.urls[2].url : ""
				});
				  } catch(err) {
				    res.send(err);
				  }
				user.save(function(err, updateUser) {
					res.send(updateUser.character);
				});
			});
		  } else {
		  	console.log('wtf');
		  }
	});
});

router.get('/poop', function(req, res, next) {
	var ts = Date.now();
	var hash = md5(ts+'3d08dd81101ddeded33c328809f4d09f6392f601'+'ddb1730843a0168c7d771db9a99a1499')
	var url = `http://gateway.marvel.com:80/v1/public/characters?limit=100&offset=1385&ts=${ts}&apikey=ddb1730843a0168c7d771db9a99a1499&hash=${hash}`;
	request(url, function(error, response, body) {
		var data = JSON.parse(body);
		// var heros = data["data"]["results"];
	 //  	var avengers = heros.map(function(val) {
	 //  		return obj = {
	 //  			name: val.name,
	 //  			id: val.id
	 //  		};
	 //  	});
	  	res.send(data);
	});
});


// router.post('/', function(req, res, next) {
//   console.log('Get char');
// });




module.exports = router;
