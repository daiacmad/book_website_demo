var Books = require("../model/bookmodel");
var multer  = require('multer');
var mongoose = require("mongoose");
var storage = multer.diskStorage({
	destination: function(req ,file,cb){
		cb(null,"./uploads");
	},
	filename:function(req,file,cb){
		cb(null,"file"+Date.now());
	}
});
var upload = multer({storage:storage});

function shows_books(res){
	Books.find(function (err, book) {
		if (err) return console.error(err);
		res.send(book);
	})	
};

function shows_books_data(res){
	Books.find(function (err, book) {
		if (err) return console.error(err);
		return res.render("index",{book:book});
	}); 
};
function get_remove_book(res){
	Books.find(function (err, book) {
		if (err) return console.error(err);
		return shows_books(res);
	}); 
}
function add_books(req,res){
	var book ={
		title: 			req.body.title,
		price: 			req.body.price,
		author: 		req.body.author,
		type: 			req.body.type,
		description: 	req.body.description,
		date: 			req.body.date,
 	};
	Books.create(book,function(err,book){
		if(err){
			console.log(err);
		}else{
			shows_books(res);
		}
	});
};

function remove_books(req,res){
	Books.remove({_id: {$in :req.body.id}},function(err){
		if(err) console.log(err);
		else{
			get_remove_book(res);
		}
	})
};

module.exports = function(app){

	app.get("/",function(req,res){
		shows_books_data(res);
	});

	app.get("/admin",function(req,res){
		res.render("admin");
	}); 

	app.post("/api/get_books",function(req,res){
		shows_books(res);
	});

	app.post('/api/add_books', upload.single('image'), function (req, res) {
	  	add_books(req,res);
	});

	app.get("/admin/add_books",function(req,res){
		res.render("admin/add_books");
	});

	app.get("/admin/remove_books",function(req,res){
		get_remove_book(res);
	});

	app.post("/api/remove_books",function(req,res){
		remove_books(req,res);
	})
}