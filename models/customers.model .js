'use strict';

var mongoose = require( 'mongoose' );
var config = require( '../config' );


var customersSchema = mongoose.Schema( {
    customerId: String,
    added: Number,
    currency: String,
    description: String,
    sourceId: String
} );

var Customers = mongoose.model( 'Customers', customersSchema );

module.exports = Customers;