'use strict';

var path = require('path');
var DataStore = require('nedb');
var dbFileName = path.join(__dirname, 'groups.json');

var db = new DataStore({
    filename : dbFileName,
    autoload : true
});


var Groups = function () {};

Groups.prototype.allGroups = function(callback) {
    return db.find({}, callback);
};

Groups.prototype.add = function(group, callback) {
    return db.insert(group, callback);
};

Groups.prototype.removeAll = function(callback) {
    return db.remove({},{ multi: true},callback);
};

Groups.prototype.get = function(id, callback) {
    return db.find({id:id}, callback);
};

Groups.prototype.remove = function(id, callback) {
    return db.remove({id:id},{ multi: true}, callback);
};

Groups.prototype.update = function(id, updatedGroup, callback) {
    return db.update({id:id},updatedGroup,{}, callback);
};

module.exports = new Groups();