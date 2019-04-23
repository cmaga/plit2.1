var mongoose = require('mongoose');

var excelSchema = mongoose.Schema({

    "Executing Department": String,
    "Project ID": String,
    "Project Name": String,
    "Director": String,
    "Project Manager": String,


},
    {
    collection: "forestExcel"
    }
    );

module.exports = excelSchema;