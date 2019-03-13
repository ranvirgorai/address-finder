
 var restful=require('node-restful');

 //Database Connection
 //var Mongoose = require('mongoose');
 //Mongoose.connect('mongodb://localhost/pricelist');
//var db=require('./db');

 var mongoose=restful.mongoose;

 //Schema

 var productSchema=new mongoose.Schema({
 	_id:Number,
 	Piece_Price:Number,
 	S_Piece_Price:Number,
 	L_Piece_Price:Number,
 	m_Piece_Price:Number,
 	m_S_Piece_Price:Number,
 	m_L_Piece_Price:Number
 });


 module.exports=restful.model('pricelist',productSchema);
