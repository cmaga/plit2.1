var mongoose = require('mongoose');

var earlyWarningSchema = mongoose.Schema({

        "Executing Department": String,
        "Project ID": String,
        "Project Name": String,
        "Director": String,
        "Project Manager": String,

        "PO_no": String,
        "Business_Unit": String,
    "Buyer": String,
    "Date_Approved": Date,
    "HOLD_STATUS": String,
    "Out_to_bid": String,
    "PO_Date": Date,
    "Req_Approval_Date": Date,
    "Req_Created_Date": Date,
    "Req_Descr": String,
    "Req_Dflt_Tble_Buyer": String,
    "Req_ID" : String,
    "Req_Status": String,
    "Req_Total": Number,
    "WO#": Number


    },
    {
        collection: "EARLY_WARNING"
    }
);

module.exports = earlyWarningSchema;