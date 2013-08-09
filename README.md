Peppa-Sync-Books

Aug 1st 2013

This is an example Alloy application with a custom sync adapter to the Peppa REST API for Drupal 7
The example os a database of books that are stored on  a Drupal server and accessed via mobile.

The app is a demo where a user has to log in (the user model)]and then can create and maintain a list of books (PeppaBook model)


To run this app you will need a valid API_KEY so that the server will grant you access and a username and password as the demo site does not have user create turned on.
The API_KEY will need to be added to any model definitions that will use the sync adapter (just take a look at the 2 models already defined)

If you want to connect it to the Peppa demo server then please send a request using the Contact Me page
at www.spiralarm.co.uk


Aug 9th Update

Update added to the user model in the sync adapter . Done so user password can be updated from model.
Also changed so that the required session is not stored as a Ti  App Property. The SESSION_ID is now internal to the sync adapter and set automatically when a user logs in.

--------------------------------------------------------------------------
Please note : 
this is not meant to be production quality code, it is an example of accessing a Drupal site using Titanium, Alloy and a custom sync adapter 