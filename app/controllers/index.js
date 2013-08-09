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

// Allow the user to update their password
function updatePwd(e){
	var win = Alloy.createController('pwdUpdate').getView();
	win.addEventListener('close', function(e){
	});
	win.open({modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL, modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});
	
}

// Log the user in  or Log them Out
function checkUser(e){
	
	var sid = getSessionID();
	if(sid){
		$.leftNavBtn.title='Logout';
		$.rightNavBtn.enabled = true;
		$.pwdBtn.enabled = true;
		$.createBtn.enabled = true;
		$.deleteBtn.enabled = true;		
	}
	else{
		$.rightNavBtn.enabled = false;
		$.pwdBtn.enabled = false;
		$.createBtn.enabled = false;
		$.deleteBtn.enabled = false;		
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
		checkUser();
	}
	else{
		var win = Alloy.createController('login').getView();
		win.addEventListener('close', function(e){
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
