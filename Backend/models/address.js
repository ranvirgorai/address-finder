var restful = require('node-restful');
var Mongoose = require('mongoose'); //restful.mongoose;

//Schema
var addressSchema = new Mongoose.Schema({
  country: String,
  officeName: String,
  zipcode: Number,
  city: String,
  districtName: String,
  stateName: String
});

module.exports = Mongoose.model('address', addressSchema);
