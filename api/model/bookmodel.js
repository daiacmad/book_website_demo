var mongoose = require("mongoose");

var BooksSchema = mongoose.Schema({
	title : String,
	price : String,
	author : String,
	type : String,
	description : String,
	date: String,
	image: String
});

var books = mongoose.model("books", BooksSchema);

module.exports = books;