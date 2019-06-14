var mongoose = require('mongoose');

var counter2Schema = mongoose.Schema({
        "Count": Number,
        "CurrentYear": Number
    },
    {
        collection: "count2"
    }
    )
;

module.exports = counter2Schema;