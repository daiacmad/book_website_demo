var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

// view engine setup
app.set('view engine', 'ejs');

// connection mongodb
var config = require("./config");
mongoose.connect(config.getDBConnectionString());

//public file
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use("/uploads",express.static('uploads'));

//action
var booksController = require("./api/controller/books");
booksController(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.listen(port,function(){
	console.log("App listening on port: "+port);
});