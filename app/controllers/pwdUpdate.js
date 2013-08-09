var users = Alloy.Collections.User;

// Do the password update here
function updatePwd(e){

	// first get current user
	if(users.length!=1){
		alert('No current User Found');
	}
	else{
		var user = users.at(0);
		user.set({pass: $.newPwd.value}).save({},{
			
			success: function(){
				alert('Password successfully Updated');
				closeWin();			
			},
		
			error: function(){
				alert('Unable to update Password');
			}
	
		});

	}

}

// close our window
function closeWin(e){
	$.pwdWin.close();				
}
