var mongoose = require('mongoose');

var cSchema = mongoose.Schema({
        'Contract_Num': Number,
        'FC_Number': Number,
        'Date': Date,
        'Description': String,
        'Project_Num_or_Fund': String,
        'Buyer_Initials': String,
        'Req_Num': String,
        'IFB/RFP_Num': String,
        'Amount': String,
        'Vendor': String,
    },
    {
        collection: "CONFIRMED_CONTRACT_DATA"
    }
    )
;

module.exports = cSchema;