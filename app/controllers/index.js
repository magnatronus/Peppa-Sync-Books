var books = Alloy.Collections.PeppaBook;
var users = Alloy.Collections.User;


// Helper to get/check if we have a user record and session id
function getSessionID(){

	if(users.length!=1){
		return false;
	}
	else{
		var user = users.at(0);
		return user.get('sid');
	}
	
}

// toggle the delete status of the tableview
function toggleDelete(e){
	$.bookList.editing = !$.bookList.editing; 	
}

// Refresh the Collection
function refreshCollection(e){
	
	// lets get the book list
	books.fetch({
		error: function(c,r,o){
			alert(r);
		}
	});
	
}

// Log the user in  or Log them Out
function checkUser(e){
	
	var sid = getSessionID();
	if(sid){
		$.leftNavBtn.title='Logout';		
	}
	else{
		$.leftNavBtn.title='Login';
		books.reset();		
	}
	return sid;
}

// Login or Logout a user
function authenticateUser(e){
	
	var sid = getSessionID();
	if(sid){
		if(users.length==1){
			var user = users.at(0).destroy();
		}
		Ti.App.Properties.setString('peppa_sid', false);
		checkUser();
	}
	else{
		var win = Alloy.createController('login').getView();
		win.addEventListener('close', function(e){
			sid = checkUser();
			Ti.App.Properties.setString('peppa_sid', sid);
			refreshCollection();			
		});
		win.open({modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL, modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});
		
	}
	
}

//show the child update window
function updateBook(e){
	var win = Alloy.createController('updateBook', e.rowData).getView();	
    $.nav.open(win, {animated : true});	
}

// Add a new book to our collection
function addBook(e){
	var win = Alloy.createController('addBook').getView();
	win.addEventListener('close', function(e){
	});
	win.open({modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL, modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});
}

// Remove a book from the collection
function deleteBook(e){
	
	// first find an object to delete
	var book = books.where({ oid: e.rowData.oid});
	if(book.length==1){
		
		// Delete Our Model
		book[0].destroy({
					
			error: function(){
				Ti.API.info('Error deleting the selected book entry.');
			}
			
		});
		
	}		
}

// Lets try and get everything going
if(checkUser()){
	refreshCollection();
}
$.index.open();
