var listbook;

function addFormAddBook(){
	ReactDOM.render(
		<InputAddBook/>
		,document.getElementById("add-form-addbook")
	);
}

var Book = React.createClass({
	remove(){
		var ListBook_data = this;
		$.post("/api/remove_books",{id:this.props.id},function(data){
			listbook.setState({mang:data});
		});
	},
	render(){
	return	<div className="book-item">
				<button onClick={this.remove}>Remove</button>
				<h3>{this.props.title}--{this.props.price}--{this.props.author}--{this.props.type}--{this.props.description}--{this.props.date}</h3>
			</div>
	}
}); 

var InputAddBook = React.createClass({
	addbook(){
		$.post("/api/add_books",{
			title: this.refs.title.value,
			price: this.refs.price.value,
			author: this.refs.author.value,
			type: this.refs.type.value,
			description: this.refs.description.value,
			date: this.refs.date.value,
		},function(data){
			listbook.setState({ mang : data });
		});
		ReactDOM.unmountComponentAtNode(document.getElementById("add-form-addbook"));
	},
	render(){
		return(
			<div className="book-form">
				<h3 className="book-input-text">Title</h3>
				<input type="text" ref="title" placeholder="Title" />

				<h3 className="book-input-text">Price</h3>
				<input type="text" ref="price" placeholder="Price" />

				<h3 className="book-input-text">Author</h3>
				<input type="text" ref="author" placeholder="Author" />

				<h3 className="book-input-text">Type</h3>
				<input type="text" ref="type" placeholder="Type" />

				<h3 className="book-input-text">Description</h3>
				<input type="text" ref="description" placeholder="Description" />

				<h3 className="book-input-text">Date</h3>
				<input type="text" ref="date" placeholder="Date" />

				<h3 className="book-input-text">Image</h3>
				<input type="file" ref="image" accept="image/x-png,image/jpg,image/jpeg" />

				<button onClick={this.addbook}>Submit </button>
			</div>
		);
	}
});

var ListBook = React.createClass({
	getInitialState() {
		listbook = this;
		return {
			mang:[],
		}	
	},
	render(){
		var $this = this;
		return(
			<div className="book-list">
			{
				this.state.mang.map(function(book,key){
					return(
						<Book key={key} id={book._id} title={book.title} price={book.price} author={book.author} type={book.type} description={book.description} date={book.date} image={book.image} />
					);
				})
			}
				<button onClick={addFormAddBook}>Add</button>
				<div id="add-form-addbook">
				</div>
			</div>
			
		);
	},
	componentDidMount() {
		var ListBook_data = this;
		$.post("/api/get_books",function(data){
			ListBook_data.setState({ mang : data });
		});
	}
});



ReactDOM.render(
	<div>
		<ListBook/>
	</div>
	,document.getElementById("root")
);