var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
	var userToken = req.cookies.mytoken;
	console.log("User Token:", userToken);
	if (userToken) {
		return res.redirect('/pokemon');
	}
  res.render('index', { title: "Cade's App" });
});

router.get('/login', function(req, res, next) {
	var userToken = req.cookies.mytoken;
	if (userToken) {
		return res.redirect('/pokemon');
	}
  res.render('login');
});

router.get('/register', function(req, res, next) {
	var userToken = req.cookies.mytoken;
	if (userToken) {
		return res.redirect('/pokemon');
	}
  res.render('register');
});

router.get('/secret', authMiddleware, function(req, res, next) {
  console.log('req.user:', req.user);
  res.send('Wooo!  Secret stuff!!!');
});

module.exports = router;