'use strict';

var Transactions = require( '../models/transactions.model.js' );
var userSchema = require( '../models/user.model.js' );
// var Customers    = require( '../models/transactions2.model.js' );
var config = require( '../config' );
var Stripe = require( 'stripe' )( config.stripeApiKey );

exports.index = function( req, res, next ) {
    if ( req.body ) {
        var transaction = new Transactions( {
            name: req.body.name
        } );
        transaction.save( function( err, trans ) {
            if ( err ) {
                return console.log( err );
            }
            res.status( 200 ).end();
        } );
    }
};

exports.createTransaction = function( req, res, next ) {


    Stripe.customers.create({
      description: 'Customer for test@example.com',
      source: req.body.token // obtained with Stripe.js
    }, function(err, customer) {
        // asynchronously called
        console.log('7777777777777777777777777777');
        console.log(req.decoded._doc._id);
        console.log('1010101010101010101010101010101010101010');
        console.log(req.decoded.$__._doc._id);
          userSchema.update({_id:req.decoded._doc._id}, {$set:{customerid:customer.id}}, function(err, result) {
            console.log('testintestintestintestintestintestintestintestintestintestintestintestintestin');
            if (err)
                console.log(err);
            //do something.
          });
        Stripe.charges.create( {
            amount: req.body.amount,
            currency: req.body.currency,
            // source: req.body.token,
            customer: customer.id,
            // card: req.body.token,
            // token: req.body.token,
            // stripeToken: req.body.token,
            description: 'Charge for test@example.com'
        }, function( err, charge ) {
            if ( err ) {
                return console.log( err );
            }
            var transaction = new Transactions( {
                transactionId: charge.id,
                amount: charge.amount,
                created: charge.created,
                currency: charge.currency,
                description: charge.description,
                paid: charge.paid,
                sourceId: charge.source.id
            } );
            transaction.save( function( err ) {
                if ( err ) {
                    return res.status( 500 );
                }
                else {
                    res.status( 200 ).json( {
                        message: 'Payment is created.'
                    } );
                }
            } );
            // asynchronously called
        } );
    });

    // console.log('----creating Transaction-------');
    // console.log(req.decoded);
    /*Stripe.charges.create( {
        amount: req.body.amount,
        currency: req.body.currency,
        source: req.body.token,
        // card: req.body.token,
        // token: req.body.token,
        // stripeToken: req.body.token,
        description: 'Charge for test@example.com'
    }, function( err, charge ) {
        if ( err ) {
            return console.log( err );
        }
        var transaction = new Transactions( {
            transactionId: charge.id,
            amount: charge.amount,
            created: charge.created,
            currency: charge.currency,
            description: charge.description,
            paid: charge.paid,
            sourceId: charge.source.id
        } );
        transaction.save( function( err ) {
            if ( err ) {
                return res.status( 500 );
            }
            else {
                res.status( 200 ).json( {
                    message: 'Payment is created.'
                } );
            }
        } );
        // asynchronously called
    } );*/
};

exports.repeatTransaction = function( req, res, next ) {

    Stripe.charges.create( {
        amount: req.body.amount,
        currency: req.body.currency,
        customer: req.body.customerid || req.decoded._doc._id,
        description: 'Charge for test@example.com'
    }, function( err, charge ) {
        if ( err ) {
            return console.log( err );
        }
        var transaction = new Transactions( {
            transactionId: charge.id,
            amount: charge.amount,
            created: charge.created,
            currency: charge.currency,
            description: charge.description,
            paid: charge.paid,
            sourceId: charge.source.id
        } );
        transaction.save( function( err ) {
            if ( err ) {
                return res.status( 500 );
            }
            else {
                res.status( 200 ).json( {
                    message: 'Payment is created.'
                } );
            }
        } );
        // asynchronously called
    } );
};
