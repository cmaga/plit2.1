var mongoose = require('mongoose');
var excelSchema = require('./excel.schema');
var excelModel = mongoose.model('excelModel', excelSchema);

excelModel.parseCsv = parseCsv;
excelModel.insertExcelData=insertExcelData;
excelModel.getForestData = getForestData;


module.exports= excelModel;


//TODO what database? this will only apply find to one? Need a seperate model for a seperate database.
function getForestData() {
    return excelModel.find()
}

function insertExcelData(excelObject) {
//find the WO that matches and upsert the data to it
/*
    return excelModel.findOneAndUpdate({"wo_nbr":excelObject.wo_nbr},
        {"Executing_Department": excelObject.Executing_Department},
        {"Project_ID": excelObject.Project_ID},
        {"Project_Name": excelObject.Proj_Name},
        {"Director": excelObject.Director},
        {"Project_Manager": excelObject.Project_Manager}
        );
        */


    return excelModel.create(excelObject);

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
