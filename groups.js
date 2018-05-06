'use strict';

var MongoClient = require('mongodb').MongoClient;

var db;


var Groups = function () {};

Groups.prototype.connectDb = function(callback) {

    MongoClient.connect(process.env.MONGODB_URL, function(err, database) {

        if(err) {

            callback(err);

        }

        db = database.db('aws').collection('groups');

        callback(err, db);

    });

};



Groups.prototype.allGroups = function(callback) {
    return db.find({}).toArray(callback);
};

Groups.prototype.add = function(group, callback) {
    return db.insert(group, callback);
};

Groups.prototype.removeAll = function(callback) {
    return db.remove({},{ multi: true},callback);
};

Groups.prototype.get = function(id, callback) {
    return db.find({id:id}).toArray(callback);
};

Groups.prototype.remove = function(id, callback) {
    return db.remove({id:id},{ multi: true}, callback);
};

Groups.prototype.update = function(id, updatedGroup, callback) {
    return db.update({id:id},updatedGroup,{}, callback);
};

module.exports = new Groups();