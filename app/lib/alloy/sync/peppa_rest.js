/**
 * This is a sync adapter for Alloy that makes calls to the Peppa REST API (V2)
 * Peppa is a Drupal 7 module for validating and creating Drupal users and storing JSON objects in a Drupal application.
 * 31 July 2013
 * 
 * this is an adaption of the rest adapter from the BookClient project
 * 
 * 9 Aug 2013 
 * - added user update so that the user password can be changed from the sync adapter
 * - modified the way the user sessionid works, now internal to sync adapter
 * 
 * Stephen Rogers
 * www.spiralarm.co.uk/peppa
 * @sarmcon
 */

// Track the SessionID
var SESSION_ID = false;

// AI_KEY - set up in model
var API_KEY = '{PUT YOUR APIKEY HERE}';

// The adapter works with V2 and above of the API
var API_VERSION = '2';

// allows automatic selection of endpoint based on environment
var PROD_URL = 'this is where you can set the default endpoint';
var DEMO_URL = 'this is where you can set the default endpoint';


// Helper function to create our formatted URL
function createMethodURL(_method,_data,stringify){
		
	// first sort our URL
	var url='';
	if(Ti.App.deployType=='production'){
		url = 'http://' +  PROD_URL + "/peppa/api/"+ API_VERSION + '/' + _method;	
	}	
	else{
		url = 'http://' + DEMO_URL + "/peppa/api/"+ API_VERSION + '/' + _method;
	}	
		
	// if data passed then url encode each
	var params=false;
	if(_data){
		for (var key in _data) {
  			if (_data.hasOwnProperty(key)) {
    			if(!params){
     				params='?';
    			}
    			else{
     			params+='&';   				
    			}
    			params+=key+'='+encodeURI((stringify)?JSON.stringify(_data[key]):_data[key]);
  			}
		}	
		url+=params;
	}

	return url;	
}


// helper function to generate our REST request
function generateRESTRequest(method,url,payload,callback){


   var request = Ti.Network.createHTTPClient({
    	
        autoRedirect:  true,
        cache:  false,
        enableKeepAlive:  true,
        timeout: 5000,
        
        onload: function(e){
    		var data = JSON.parse(this.responseText);
         	if (callback) {
        		callback(true,data, false);
        	}
        },
        
        onerror: function(e){			
        	if (callback) {
        		callback(false,this.responseText, e);
        	}
        }
        
    });
        
    // now send the request
	request.open(method,url);
	request.setRequestHeader("X-PEPPA-API-KEY",API_KEY);
	
	// If sessionid defined put it in the header
	if(SESSION_ID){
		request.setRequestHeader("X-PEPPA-SESSIONID",SESSION_ID);
	}
	
	// if we have a payload it should have a content typeof JSON
	if(payload){
		request.setRequestHeader("Content-Type","application/json");
		request.send(JSON.stringify(payload));
  	}
   	else{
		request.send();   		
   	}
	
}

/*
 * We have a special sync function for the user as it should really only contain 1 record and should perist
 * when logged in until the user logs out
 * 
 * Our user model only supports Read and Create
 */
function userSync(method, model, options){

	var payload = model.toJSON();
	var error;
	
	switch(method){
		
		// This is User Login
		case 'read': 
			var url = createMethodURL('user', payload);
			generateRESTRequest('GET',url,null,function(success,res, error){
				if(success) {
					SESSION_ID = res.user[model.idAttribute];
					options.success(res.user, JSON.stringify(res.user), options);
				}
				else{
					var err = (res)?res.error:error;
					Ti.API.error(err);
					options.error(model, error, options);
					model.trigger('error');
				}
			});
			break;
			
		// This is User Create
		case 'create': // Lets create a user
			var url = createMethodURL('user');
			generateRESTRequest('POST',url,payload,function(success,res, error){
				if(success) {
					options.success(res.user, JSON.stringify(res.user), options);
				}
				else{
					var err = (res)?res.error:error;
					Ti.API.error(err);
					options.error(model, error, options);
					model.trigger('error');
				}
			});
			break;
		
		// User password Update
		case 'update':
			var url = createMethodURL('user');
			generateRESTRequest('PUT',url,payload,function(success,res, error){
				if(success) {
					options.success(res.user, JSON.stringify(res.user), options);
				}
				else{
					var err = (res)?res.error:error;
					Ti.API.error(err);
					options.error(model, error, options);
					model.trigger('error');
				}
			});
		
			break;

		// User Logout
		case 'delete': 
			var url = createMethodURL('user/logout');
			generateRESTRequest('GET',url,null,function(success,res, error){
				if(success) {
					SESSION_ID = false;
					options.success(res, JSON.stringify(res), options);
				}
				else{
					var err = (res)?res.error:error;
					Ti.API.error(err);
					options.error(model, error, options);
					model.trigger('error');
				}
			});		
			break;
		
		default:
			error = 'User function not implemented';
			
	}
	
	// what happens if we have an error
	if (error) {
		options.error(model, error, options);
		Ti.API.error(error);
		model.trigger('error');
	}
	
}


/*
 * This is the Sync for our generic JSON objects store
 */
function objectSync(method, model, options, name){
	
	var payload = model.toJSON();
	var error;
	
	// if we have no sessionid don't bother with the call - waste of time as it WILL fail
	if(!SESSION_ID){
			error = 'No session id log user in first!';
	}
	else{
		// Process the Request
		switch(method) {
		
			case 'read':
				// get single object record or all 
				if( payload[model.idAttribute]){
					var url = createMethodURL('object/'+name+'/'+payload[model.idAttribute]);
					generateRESTRequest('GET',url,null,function(success,res, error){
						if(success){
							options.success(res.data, JSON.stringify(res.data), options);
						}	
						else{
							var err = (res)?res.error:error;
							Ti.API.error(err);
							options.error(model, error, options);
							model.trigger('error');
						}
					
					});				
				}
				else{
					var url = createMethodURL('object/'+name);	
					generateRESTRequest('GET',url,null, function(success,res, error){
						if(success){
							options.success(res.data, JSON.stringify(res.data), options);
						}	
						else{
							var err = (res)?res.error:error;
							Ti.API.error(err);
							options.error(model, error, options);
							model.trigger('error');
						}
				
					});				
				}
				break;
			
			case 'create':
				var url = createMethodURL('object/'+name);
				generateRESTRequest('POST',url,payload,function(success,res, error){
					if(success) {
						options.success(res.data, JSON.stringify(res.data), options);
					}
					else{
						var err = (res)?res.error:error;
						Ti.API.error(err);
						options.error(model, error, options);
						model.trigger('error');
					}
				});
				break;
			
			case 'update':
				var url = createMethodURL('object/'+name+'/'+payload[model.idAttribute]);
				generateRESTRequest('PUT',url,payload,function(success,res, error){
					if(success) {
						options.success(res.data, JSON.stringify(res.data), options);
					}
					else{
						var err = (res)?res.error:error;
						Ti.API.error(err);
						options.error(model, error, options);
						model.trigger('error');
					}
				});
				break;
			
			case 'delete': // process a delete
				var url = createMethodURL('object/'+name+'/'+payload[model.idAttribute]);
				generateRESTRequest('DELETE',url,null,function(success,res, error){
					if(success) {
						options.success(res.data, JSON.stringify(res.data), options);
					}
					else{
						var err = (res)?res.error:error;
						Ti.API.error(err);
						options.error(model, error, options);
						model.trigger('error');
					}
				});
				break;
		
		}
	}
	
	
	// what happens if we have an error
	if (error) {
		options.error(model, error, options);
		Ti.API.error(error);
		model.trigger('error');
	}
	
}


/*
 * Exports
 */

// Override the Backbone.sync method with the following
module.exports.sync = function(method, model, options){
	
	// So we can handle any  special cases lets do a switch-a-roo
	switch(model.config.adapter.collection_name){
		
		case 'user': 
			userSync(method,model,options);
			break;
		
		default: // this is our any other object JSON store
			objectSync(method, model, options,model.config.adapter.collection_name);
		
	}
	
};

// Perform some actions before creating the Model class
module.exports.beforeModelCreate = function(config, name) {
	
	config = config || {};
	
	// is their an Application Key defined
	if(config.adapter.api_key){
		API_KEY = config.adapter.api_key;
	}
	
	// is their an API version defined
	if(config.adapter.api_version){
		API_VERSION = config.adapter.api_version;
	}
	
	// see if we need to override the PROD API Endpoint
	if(config.adapter.prod_url){
		PROD_URL = config.adapter.prod_url;
	}

	// see if we need to override the DEMO API Endpoint
	if(config.adapter.demo_url){
		DEMO_URL = config.adapter.demo_url;
	}

	return config;
	
};

// Perform some actions after creating the Model class 
module.exports.afterModelCreate = function(Model, name) {
	// Nothing to do
};