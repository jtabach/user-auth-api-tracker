'use strict';

var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
  hero: []
});

var List = mongoose.model('List', listSchema);

module.exports = List;
