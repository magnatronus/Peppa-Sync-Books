/**
 * The user model is a special case as it is used to validate (or create) a Drupal user
 * and obtain the required session id needed to access the other sync functions.
 * 
 */
exports.definition = {
	
	config: {

		adapter: {
			type: "peppa_rest",
			collection_name: "user",
			prod_url: 'peppa.c2h4.co.uk',
			demo_url: 'peppa.c2h4.co.uk',
			api_version: '2',
			api_key: '{you need an app key here}'
		}
	},		
	
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			// extended functions and properties go here
			idAttribute: 'sid'
		});
		
		return Model;
	},
	
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});
		
		return Collection;
	}
}
