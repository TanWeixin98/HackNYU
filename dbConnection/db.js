var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

var mysql_Pool = mysql.createPool({
                                 host: "localhost",
                                 user: "root",
                                 password: "Tandolphin98",
                                 database: "nyuHack"
                                 });
app.listen(8080,function(){});

app.post('',function(req, res){});

mysql_Pool.getConnection(function(err, connection ) {
            if (err) throw err;
            console.log("Connected!");
            });

function insert(schemeName){}

function createScheme(schemeName){}

