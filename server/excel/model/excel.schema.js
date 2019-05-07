var mongoose = require('mongoose');

var excelSchema = mongoose.Schema({

    "Executing_Department": String,
    "Project_ID": String,
    "Project_Name": String,
    "Director": String,
    "Project_Manager": String,
    "wo_nbr": Number,


},
    {
    collection: "forestExcel"
    }
    );

module.exports = excelSchema;