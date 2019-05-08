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
    return excelModel.create(excelObject);
}

function parseCsv() {
    excelModel.parseCsv();
}


