'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var groups = require("./groups.js");

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var LocalAPIKey = require('passport-localapikey').Strategy;
var users = require('./users.js');

var cors = require("cors");


var researchersResource = require('./integration/Researchers.js');
var request = require('request').defaults({json: true});

var universitiesResource = require('./integration/Universities.js');



var port = (process.env.PORT || 16778);
var baseAPI = "/api/v1";

var app = express();


passport.use(new LocalAPIKey(
    function(apikey, done) {
        users.findOne({ apikey: apikey }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          return done(null, user);
        });
    }
));




passport.use(new BasicStrategy(
    function(username, password, done) {
        users.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!user.validPassword(password)) { return done(null, false); }
          return done(null, user);
        });
    }
));


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());


//Este get es para la integracion con el api de Researchers
app.get(baseAPI + "/researchers", (req, response) => {
    console.log("GET /researchers"); 

    request.get(researchersResource("/researchers"), (error, resp, body) => {
        if (error) {
            console.log('error:'+error);
            response.sendStatus(500);
        } else {
            response.send(body);
        }
    });
});


//Este get es para la integracion con el api de Universities
app.get(baseAPI + "/universities", (req, response) => {
    console.log("GET /universities"); 

    request.get(universitiesResource("/universities"), (error, resp, body) => {
        if (error) {
            console.log('error:'+error);
            response.sendStatus(500);
        } else {
            response.send(body);
        }
    });
});


//Desde aqui es para los metodos de la propia api
app.get(baseAPI + "/groups", 
     passport.authenticate(['basic', 'localapikey'], {session:false}), 
     
    (request, response) => {
    console.log("GET /groups"); 
    
    groups.allGroups((err,groups)=>{
        response.send(groups);    
    });
});

app.post(baseAPI  + "/groups/:wrong", 
    passport.authenticate(['basic', 'localapikey'], {session:false}), 
    
    (request, response) => {
    console.log("Method Not Allowed ");
    response.sendStatus(405);    
});


app.put(baseAPI + "/groups", 
    passport.authenticate(['basic', 'localapikey'], {session:false}), 
    
    (request, response) => {
    console.log("Method Not Allowed ");
    response.sendStatus(405);   
});

app.post(baseAPI + "/groups", 
    passport.authenticate(['basic', 'localapikey'], {session:false}), 

    (request, response) => {
    console.log("POST /groups");
    var group = request.body;
    groups.add(group);
    
    if(groups.length==0){
        response.sendStatus(503);
    }
    else{
            response.sendStatus(201);

    }
});

app.delete(baseAPI + "/groups", 
    passport.authenticate(['basic', 'localapikey'], {session:false}), 

    (request, response) => {
    console.log("DELETE /groups");

    groups.removeAll((err,numRemoved)=>{
        console.log("groups removed:"+numRemoved);
        response.sendStatus(200);    
    });

});

app.get(baseAPI + "/groups/:id", 
    passport.authenticate(['basic', 'localapikey'], {session:false}), 
    
    (request, response) => {
    console.log("GET /groups/"+id);
    var id = request.params.id;

    groups.get(id,(err,groups)=>{
        if (groups.length == 0) {
            response.sendStatus(404);
        }
        else {
            response.send(groups);  
        }
    });
});


app.delete(baseAPI + "/groups/:id", 
    passport.authenticate(['basic', 'localapikey'], {session:false}), 

    (request, response) => {
    var id = request.params.id;

    groups.remove(id,(err,numRemoved)=>{
        console.log("groups removed:"+numRemoved);
        if (numRemoved === 0) {
            response.sendStatus(404);    
        } else {
            response.sendStatus(200);    
        }    
    });

    console.log("DELETE /groups/" + id);
});


app.put(baseAPI + "/groups/:id", 
    passport.authenticate(['basic', 'localapikey'], {session:false}), 

    (request, response) => {
    var id = request.params.id;
    var updatedGroup = request.body;

    groups.update(id, updatedGroup ,(err,numUpdates) => {
        console.log("groups updated:"+numUpdates);
        if (numUpdates === 0) {
            response.sendStatus(404);    
        } else {
            response.sendStatus(200);    
        }
        
    });

    console.log("UPDATE /groups/"+id);
});


groups.connectDb((err) => {
    if (err) {
        console.log("Could not connect with MongoDB");
        process.exit(1);
    }
    
    users.connectDb((err) => {
        if (err) {
            console.log("Could not connect with MongoDB");
            process.exit(1);
        }
        app.listen(port, () => {
            console.log("Server with GUI up and running!!");
        });   
        
    });
});