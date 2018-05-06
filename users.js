'use strict';



var MongoClient = require('mongodb').MongoClient;

var db;



var User = function(params) {

    this.username = params.username;

    this.email = params.email;

    this.password = params.password;

};



User.prototype.validPassword = function(password) {

    return this.password == password;

};



var Users = function () {};



Users.prototype.connectDb = function(callback) {

    MongoClient.connect(process.env.MONGODB_URL, function(err, database) {

        if(err) {

            callback(err);

        }

        

        db = database.db('aws').collection('users');

        

        callback(err, database);

    });

};



Users.prototype.findOne = function(user, callback) {

    return db.findOne(user, function(err, item) {

        if (err) {

            callback(err);

        } else {

            if (item && item != null) {

                callback(err, new User(item));

            } else {

                callback(err, null);

            }

        }

    });

};



module.exports = new Users();