var app =  require('../../express');
var excelModel = require('./excel-model');
var csv = require('fast-csv');


//TODO writing the service file for forest excel csv import.

app.get('/api/excel', excelParse);

/*function parseCsv(req, res) {
    //creates a stream based on a static location that can then be parsed. Needs to be dynamic.

    return csv
        .fromPath("/webdev/csv/test")
        .on("data", function(data){
            console.log(data);
        })
        .on("end", function(){
            console.log("done");
        });
}
*/

function excelParse(req, res) {
    console.log("our function actually got called somehow poggers");
    //parse the csv
    csv
        .fromPath("server/csv/test.csv", {headers: true})
        .on("data", function (data) {
            //insert the csv into mongo
            excelModel
                .insertExcelData(data)
                .then(function (response) {
                    console.log('uhhhhhhh');
                });
            //console.log(data);
        })
        .on("end", function () {
            console.log("done");
        });
}




function insertExcelData(req, res) {

    excelModel
        .insertExcelData()
        .then(function (data) {
            res.send(data);
        }, function (err) {
            res.send(err);
        });
}

/*
function createStream(req, res) {
    var csv = require("fast-csv");

    csv
        .fromPath("my.csv")
        .on("data", function(data){
            console.log(data);
        })
        .on("end", function(){
            console.log("done");
        });
}
*/