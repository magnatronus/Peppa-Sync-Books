var books = Alloy.Collections.PeppaBook;
var users = Alloy.Collections.User;

// lets use out user model and log the user in
function loginUser(e){
	
	$.username.blur();
	$.password.blur();
	var user = Alloy.createModel('user',{name: $.username.value, pass: $.password.value}); 
	user.fetch({
 		
 		success: function(r){
 			users.add(r);
  			$.loginWin.close();
 		},
 		
 		error: function(){
 			alert('Unable to validate the supplied credentials.\nPlease try again.');
 		}
 	});


}
