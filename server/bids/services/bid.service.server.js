//files you're including
var app = require('../../../express'); // include express
var bidModel = require('../model/bid.model.server'); //include bid model
var counterModel = require('../model/counter.model.server'); // include counter model

//ties an express path/route with a certain function. Those functions are defined below. The colon means it gets replaced with its associated value. 
app.post('/api/add-bid', createBid);
app.get('/api/bids', getBids);
app.get('/api/bid/:bidId', getSpecificBid);
app.put('/api/update-bid/:bidId', updateBid);
app.delete('/api/remove-bid/:bidId', removeBid);
app.put('/api/save-fields/:bidId', saveFields);


function createBid(req, res) {
    var bid = req.body;
    var b_id = bid.Bid_Type;
    var fund = bid.Fund_Code.slice(-1);
    var bidNum = "";
    var d = new Date;
    console.log('creating bid')
    counterModel.getCount()
        .then(function (response) {
            console.log(response)
            bidNum = response.Count;
            counterModel.incrCount().then(function(error){
                console.log(error);
            b_id = b_id + " " + bidNum;
            if (fund != "N") {
                b_id = b_id + fund;
            }
            bid.Bid_ID = b_id +"-" + (d.getYear() - 100);

            bidModel
                .createBid(bid)
                .then(function (bid) {
                    res.send(bid);
                }, function (err) {
                    res.send(err);
                });
            });

        });
}




function updateBid(req, res) {
    var bid = req.body;
    bidModel
        .updateBid(bid, req.params.bidId)
        .then(function (bid) {
            console.log(bid)
            res.send(bid);
        }, function (err) {
            console.log("error");
            res.send(err);
        });
}

function getBids(req, res) {
    bidModel
        .getBids()
        .then(function (bids) {
            res.send(bids);
        }, function (err) {
            res.send(err);
        });
}

function getSpecificBid(req, res) {
    bidModel
        .getSpecificBid(req.params.bidId)
        .then(function (bid) {
            res.send(bid);
        }, function (err) {
            res.send(err);
        });
}

function removeBid(req, res) {
    bidModel
        .removeBid(req.params.bidId)
        .then(function (bid) {
            res.send(bid);
        }, function (err) {
            res.send(err);
        });
}

function saveFields(req,res){
    var bid = req.body;
    console.log(req.params.bidId);
    bidModel
        .updateBid(bid, req.params.bidId)
        .then(function (bid) {
            console.log(bid);
            res.send(bid);
        }, function (err) {
            console.log(err);
            res.send(err);
        });
}
