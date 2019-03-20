var mongoose = require('mongoose');
var bidSchema = require('./bid.schema.server');
var bidModel = mongoose.model('BidModel', bidSchema);

bidModel.createBid = createBid;
bidModel.getBids = getBids;
bidModel.getSpecificBid = getSpecificBid;
bidModel.updateBid = updateBid;
bidModel.removeBid = removeBid;
module.exports = bidModel;

function createBid(bid) {
    //bid.Timeframe = Date.parse(bid.Timeframe);
    console.log("server" + JSON.stringify(bid));

    return bidModel.create(bid);
}

function getBids() {
    return bidModel.find();
}

function getSpecificBid(bidId) {
    return bidModel.find({"_id": bidId});
}

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
}
function removeBid(bidId) {
    return bidModel.remove({"_id": bidId});
}
