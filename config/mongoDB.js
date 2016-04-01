'use strict';

var mongoose = require( 'mongoose' );
var config = require( './index.js' );

// mongoose.connect( config.mongoURI );
var uri = process.env.MONGOLAB_URI || config.mongoURI || 'mongodb://127.0.0.1/testdb'; 
console.log('CONNECTING 2 ====> ', uri);

mongoose.connect(uri, {}, function(err, db){
	if(err) {
	  console.log('Connection Error ::: ', err);
	} else {
	  console.log('Successfully Connected!');
	}
});