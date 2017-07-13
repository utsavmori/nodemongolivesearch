var app   = require('express')(); // Express App include
var http = require('http').Server(app); // http server
var mongo=require('mongodb');
var assert=require('assert');
var murl="mongodb://localhost:27017/anydb";
var bodyParser = require("body-parser");
var url=require('url');
var queryString = require( "querystring" );
 // Body parser for fetch posted data

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // Body parser use JSON data


app.get('/index',function(req,res){

 res.sendFile(__dirname+'/index.html');

});

app.post('/index',function(req,res){

 var key=req.body;

var resarr=[];
mongo.connect(murl,function(err,db){
	assert.equal(null,err);
	var cursor=db.collection('names').find({name: new RegExp(key.name)},{"name":1});//serches any name that contains "key"
	
	cursor.forEach(function(doc,err){
		assert.equal(null,err);
		resarr.push(doc);
	},function(){
		assert.equal(null,err);		
		var jso={"jsa":resarr}
		res.send(jso);
		//res.render('index',{items:resarr});
	});
		db.close();
	
	});
});

app.listen(8000);