var express = require('express');
var app 	= express();
var bodyParser = require('body-parser');

// BASE SETUP SECTION
var mongoose = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o')
var Bear = require('./app/models/bear');

//configure app to use bodyParser() to get the data from a post
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // seting our port

// ROUTES FOR OUR API
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next){
	console.log('Something is happening.');
	next();
});

//to test the route is working on our Localhost:8080/api or something
// this one is just for testing
router.get('/', function(req, res){
	res.json({message: 'hooray! wlecome to our api'});
});

//our routs ended in /bears
router.route('/bears')
	.post(function(req, res){
		console.log('got into /bears');console.log('req body', req.body);
		var bear = new Bear(); // create a new instance of the bear Model
		bear.name = req.body.name; // set the bears name came with the request
		console.log(bear);
		// here we save the bear and check for errors
		bear.save(function(err){
			console.log('trying to save me!');
			if (err){
				console.log('got an error');
				res.send(err);
			}
			res.json({message:'Bear created!'})
		});
	})
	.get(function(req, res){
		Bear.find(function(err, bears){
			if (err)
				res.send(err);
			res.json(bears);
		})
	});



//more routing for the api here
//this is for Register out routes, everything will come from /api
app.use('/api', router);

//here we start the server
app.listen(port);
console.log('Magic happens on port '+port);








