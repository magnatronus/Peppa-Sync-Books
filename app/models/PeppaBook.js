/**
 * This is an example of creating an object model for use with the Peppa Module
 * The only thing that each model MUST have is the idAttribute set to oid
 * as all objects in Peppa have a unique key identified as oid.
 * 
 */
exports.definition = {
	
	config: {

		adapter: {
			type: "peppa_rest",
			collection_name: "PeppaBook",
			prod_url: 'peppa.c2h4.co.uk',
			demo_url: 'peppa.c2h4.co.uk',
			api_version: '2',
			api_key: '{you need an app key here}'
		}
	},		
	
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			// extended functions and properties go here
			idAttribute: 'oid'
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
