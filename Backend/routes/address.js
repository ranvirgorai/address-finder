var express = require('express');
var router = express.Router();
var _ = require('lodash');
var address = require('../models/address');

router.get('/all', function(req, res) {
  var responce = {};
  address.find({}, function(err, data) {
    if (err) {
      responce = { error: true, 'Response: ': 'Error fetching data' };
    } else {
      var country = _.uniq(data.map(item => item.country));
      var state = _.uniq(data.map(item => item.stateName));
      var city = _.uniq(data.map(item => item.city));
      responce = { error: false, data: { country, state, city } };
    }
    res.json(responce);
  });
});

router.get('/get-zip', function(req, res) {
  var responce = {};
  var country = req.query.country;
  var stateName = req.query.state;
  var city = req.query.city;
  address.findOne({ country, stateName, city }, function(err, data) {
    if (err) {
      responce = { error: true, 'Response: ': 'Error fetching data' };
    } else {
      responce = { error: false, data };
    }
    res.json(responce);
  });
});

router.get('/', function(req, res) {
  var responce = {};
  let zipcode = req.query.zipcode;
  address.findOne({ zipcode: zipcode }, function(err, data) {
    if (err) {
      responce = { error: true, 'Response: ': 'Error fetching data' };
    } else {
      responce = { error: false, data: data || {} };
    }
    res.json(responce);
  });
});

module.exports = router;
