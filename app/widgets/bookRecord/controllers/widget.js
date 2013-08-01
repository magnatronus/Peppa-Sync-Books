var books = Alloy.Collections.PeppaBook;
var mybook=false;

// gets a current Book for update
function loadBook(id){
	
	var found = books.where({oid:id});
	if(found.length==1){
		mybook = found[0];
		$.name.value = mybook.get('name');
		$.isbn.value = mybook.get('isbn');
		$.author.value = mybook.get('author');
		$.genre.value = mybook.get('genre');	
	}
	else{
		alert('Error getting book detail');
	}
	
}


// Update our book record
function updateBook(e){

	// let gather our data
	var editbuffer= {
			name: $.name.value,
			isbn: $.isbn.value,
			author: $.author.value,
			genre: $.genre.value
	};

	// New Book opton
	if(!mybook){
		var book = Alloy.createModel('PeppaBook'); 
		books.add(book);
		book.save( editbuffer,{
		
			success: function(){
				alert('You book details have been recorded');
				$.trigger('save');
			},
		
			error: function(){
				alert('There was an error saving your book details');
				$.trigger('save');
			}
		});
	}
	else{
		mybook.set(editbuffer).save({},{
					
			error: function(){
				alert('There was an error updating your book details');
			}			
		});
	}

	
}

/*
 * Exports
 */
exports.loadBook = loadBook;