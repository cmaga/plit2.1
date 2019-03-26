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

//TODO: this code does not automatically initialize the CurrentYear in the database it only updates it. When exporting or migrating databases make sure the count collections has a CurrentYear key.
//code to initalize current year to 2019 below:
// db.count.update({"_id": ObjectId("5beb292d322fe1265beaae98")}, {$set : {"CurrentYear": 19}})


function createBid(req, res) {
    var bid = req.body;
    var b_id = bid.Bid_Type;
    var fund = bid.Fund_Code.slice(-1);
    var bidNum = "";
    var yearStored = "";

    //this is the date of the day that the user is using this feature.
    var d = new Date;
    console.log('creating bid');

    var currentYear = (d.getYear() - 100);

    //get count and check if
    counterModel.getCount()
        .then(function (response) {

            //this is count from the backend
            yearStored = response.CurrentYear;

            if (yearStored < currentYear) {
                //reset count and increment yearStored
                counterModel.setCount(1).then(function(error){
                    console.log(error);
                });

                counterModel.incrCurrentYear().then(function(error){
                    console.log(error);
                });

                //get again and do the other stuff
                counterModel.getCount()
                    .then(function (response) {
                        console.log(response);

                        bidNum = response.Count;

                        //bid is pre incremented so that next time it is used it actually has already been set.
                        counterModel.incrCount().then(function(error){
                            console.log(error);
                            b_id = b_id + " " + bidNum;

                            if (fund != "N") {
                                b_id = b_id + fund;
                            }
                            bid.Bid_ID = b_id +"-" + currentYear;

                            bidModel
                                .createBid(bid)
                                .then(function (bid) {
                                    res.send(bid);
                                }, function (err) {
                                    res.send(err);
                                });
                        });

                    });
            } else {
                //year hasn't changed set the count to the bid number and preincrement it for next use
                counterModel.getCount()
                    .then(function (response) {
                        console.log(response);
                        bidNum = response.Count;


                        //bid is pre incremented so that next time it is used it actually has already been set.
                        counterModel.incrCount().then(function(error){
                            console.log(error);
                            b_id = b_id + " " + bidNum;

                            if (fund != "N") {
                                b_id = b_id + fund;
                            }
                            bid.Bid_ID = b_id +"-" + currentYear;

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


        });
    //if it did do the updates then get count again and do all the other stuff

    //if it didnt do stuff like normal. set bidnum to the count and preincrement


}




function updateBid(req, res) {
    var bid = req.body;
    bidModel
        .updateBid(bid, req.params.bidId)
        .then(function (bid) {
            console.log(bid);
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
