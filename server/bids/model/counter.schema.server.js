var mongoose = require('mongoose');

var counterSchema = mongoose.Schema({
        "Count": Number,
        "CurrentYear": Number
    },
    {
        collection: "count"
    }
    )
;

module.exports = counterSchema;