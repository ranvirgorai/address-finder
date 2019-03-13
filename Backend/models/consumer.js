 var restful=require('node-restful');
 //var Mongoose = require('mongoose');
 //Mongoose.connect('mongodb://localhost/consumer');
//var db=require('./db');
var mongoose=restful.mongoose;

 //Schema
 var consumerSchema=new mongoose.Schema({
 	_id:Number,
 	name:String,
 	mobile:Number,
 	address:String,
 	date:String,
 	color:Number,
 	grSpice:Number,
      material:{
      	name:String,
      	cost:Number
      },
     	piece:{
     		small:Number,
     		mid:Number,
     		large:Number
     	},
     	pieceCost:{
     		small:Number,
     		mid:Number,
     		large:Number
     	},
     	delevery:{
     		status:Boolean,
     		date:String
     	},
     	invoice:{
     		total:Number,
     		paid:Number,
     		balance:Number
     	},
     	remark:{
     		mixed:Boolean,
     		ready:Boolean,
     		rating:Number
     	}
 	},
 	{
 		strict:false
 	}

 	);


 module.exports=restful.model('consumer',consumerSchema);
