
 //var restful=require('node-restful');

 var Mongoose = require('mongoose');
 //Mongoose.connect('mongodb://localhost/consumer');
//var db=require('./db')
//var mongoose=restful.mongoose;

 //Schema

 var logData=new Mongoose.Schema({
 	_id:Number,
 	date:Date,
 		print:{
 			a4:Number,
 			a6:Number
 		}

 });


 module.exports=Mongoose.model('log',logData);
