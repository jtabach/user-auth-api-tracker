'use strict';

console.log('index.js!');

var ref = new Firebase('https://user-diet-tracker.firebaseio.com/');

ref.set('A user is logged in');