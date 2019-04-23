var mongoose = require('mongoose');
var excelSchema = require('./excel-schema');
var excelModel = mongoose.model('excelModel', excelSchema);

excelModel.parseCsv = parseCsv;
excelModel.insertExcelData=insertExcelData;
module.exports= excelModel;

function insertExcelData(excelObjects) {


    return excelModel.create(excelObjects);

    /*
    //assuming excelObjects are an array of objects
    return excelModel.insertOne(excelObjects, (err, doc)=> {
        if (err) {
            console.log("something went wrong with inserting the excel objects maybe");
        }
        console.log(doc);
    });
    */
}

function parseCsv() {
    excelModel.parseCsv();
}

/*
function updateBid(bid, bidId) {
    console.log(bidId);
    console.log("UPDATING " + JSON.stringify(bid));
    return bidModel.findOneAndUpdate({"_id": bidId}, {$set: bid}, {new: true}, (err, doc) => {
        if (err) {
            console.log(`the bid id we are searching for is ${bidId}`);
            console.log("something went wrong when updating data")
        }
        console.log(doc);
    });
}*/
