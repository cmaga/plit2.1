var app =  require('../../express');
var excelModel = require('./excel-model');
var csv = require('fast-csv');

const fs = require('fs');
const http = require('http');
const multer = require('multer');
const upload = multer({dest: 'server/csv/temporary/'});

var mongoose = require('mongoose');
var db = mongoose.connection;


//TODO writing the service file for forest excel csv import.

app.get('/api/excel', excelParse);

//TODO this works but we need a response in the browser and we may want objects instead of arrays.

app.post('/api/upload', upload.single('file'), function (req, res) {
    let fileRows = [];

    let dummy = {

        "Project ID" : "P0006  ",
        "Project Name" : "Gloucester Drawbridge Replacement",
        "Executing Department" : "Capital Delivery",
        "Director" : "Cadman, Kenneth",
        "Project Manager" : "Nicoll, Brad",
    };

    //create a collection with dummy data just in case there is not already one there
    excelModel
        .insertExcelData(dummy)
            .then(function(response) {
                console.log("inserted dummy data");


                //delete the old collection to make room for the new excel sheet
                db.dropCollection("forestExcel", function (err, result) {
                    if (err) throw err;
                    if (result) console.log("old excel file deleted");
                });
            });
//
    // open uploaded file
    csv.fromPath(req.file.path, {headers: true})
        .on("data", function (data) {
            fileRows.push(data); // push each row

            excelModel
                .insertExcelData(data)
                .then(function (response) {
                    console.log('thinking...');
                });

        })
        .on("end", function () {
            console.log(fileRows);
            fs.unlinkSync(req.file.path);   // remove temp file
            //process "fileRows" and respond

            res.send(fileRows);
        });
});



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