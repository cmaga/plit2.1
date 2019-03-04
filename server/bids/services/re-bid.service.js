//dependencies
var app = require('../../../express');
var bidModel = require('../model/bid.model.server');
var counterModel = require('../model/counter.model.server');


//function express routes create/read (all bids and individual bids/update/delete
app.post('/api/createbid', createBid);
app.get('/api/readbids', readBids);
app.get('/api/readbid', readBid);
app.put('api/updatebid', updateBid);
app.delete('api/deletebid', deleteBid);

//function definitions
function createBid() {

}
