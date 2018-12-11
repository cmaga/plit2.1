var cron = require("node-cron");
var express = require('express');
var app = express();
cron.schedule("* */4 * * *", function(){
    console.log(new Date);
    var trello = require('./trello/trello.service.server.js');
    trello.init();

});

app.listen(3128);