'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var groups = require("./groups.js");

var port = (process.env.PORT || 16778);
var baseAPI = "/api/v1";

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

/*groups.add([{
 /*       name: "pepe",
        phone: "12345",
        email: "pepe@pepe.com"
    }, {
        name: "luis",
        phone: "67890",
        email: "luis@pepe.com" 
    }]); */

app.get(baseAPI + "/groups", (request, response) => {
    console.log("GET /groups"); 
    
    groups.allGroups((err,groups)=>{
        response.send(groups);    
    });
});

app.post(baseAPI  + "/groups/:wrong", (request, response) => {
    console.log("Method Not Allowed ");
    response.sendStatus(405);    
});


app.put(baseAPI + "/groups", (request, response) => {
  console.log("Method Not Allowed ");
    response.sendStatus(405);   
});

app.post(baseAPI + "/groups", (request, response) => {
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

app.delete(baseAPI + "/groups", (request, response) => {
    console.log("DELETE /groups");

    groups.removeAll((err,numRemoved)=>{
        console.log("groups removed:"+numRemoved);
        response.sendStatus(200);    
    });

});

app.get(baseAPI + "/groups/:id", (request, response) => {
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


app.delete(baseAPI + "/groups/:id", (request, response) => {
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


app.put(baseAPI + "/groups/:id", (request, response) => {
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


app.listen(port, () => {
    console.log("Server with GUI up and running!!");
});