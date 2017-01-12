module.exports = function(app){

	app.get("/",function(req,res){
		shows_books_data(res);
	});

	app.get("/admin",function(req,res){
		res.render("admin");
	}); 

	app.get("/api/shows_books",function(req,res){
		shows_books(res);
	});

	app.post('/api/add_books', upload.single('file'), function (req, res) {
	  	console.log(req.file);
	});

	app.get("/admin/book",function(req,res){
		res.render("admin/book");
	});

}