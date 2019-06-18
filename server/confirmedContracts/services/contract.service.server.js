//files you're including
var app = require('../../../express');
var contractModel = require('../model/contract.model.server');
var counter2Model = require('../model/counter2.model.server');

//ties an express path/route with a certain function. Those functions are defined below. The colon means it gets replaced with its associated value. 
app.post('/api/add-contract', createContract);
app.get('/api/contracts', getContracts);
app.get('/api/contract/:contractNum', getSpecificContract);
app.put('/api/update-contract/:contractNum', updateContract);
app.delete('/api/remove-contract/:contractNum', removeContract);
app.put('/api/save-fields/:contractNum', saveFields);

//TODO: this code does not automatically initialize the CurrentYear in the database it only updates it. When exporting or migrating databases make sure the count collections has a CurrentYear key.
//code to initalize current year to 2019 below:
// db.count.update({"_id": ObjectId("5beb292d322fe1265beaae98")}, {$set : {"CurrentYear": 19}})

function createContract(req, res) {
    console.log('service');
    var contract = req.body;
    console.log(req.body);
    //var b_id = bid.Bid_Type;
    //var fund = bid.Fund_Code.slice(-1);
    var contractNum = 0;
    //var d = new Date;
    console.log('creating contract');
    counter2Model.getCount()
        .then(function (response) {
            console.log(response);
            contractNum = response.Count;
            counter2Model.incrCount().then(function(error){
                console.log(error);
                contract.Contract_Num = contractNum;
                contractModel
                    .createContract(contract)
                    .then(function (contract) {
                        res.send(contract);
                    }, function (err) {
                        res.send(err);
                    });
            });

        });
}




function updateContract(req, res) {
    var contract = req.body;
    contractModel
        .updateContract(contract, req.params.contractNum)
        .then(function (contract) {
            console.log(contract);
            res.send(contract);
        }, function (err) {
            console.log("error");
            res.send(err);
        });
}

function getContracts(req, res) {
    console.log('getting contracts...');
    contractModel
        .getContracts()
        .then(function (contracts) {
            res.send(contracts);
        }, function (err) {
            res.send(err);
        });
}

function getSpecificContract(req, res) {
    contractModel
        .getSpecificContract(req.params.contractNum)
        .then(function (contract) {
            res.send(contract);
        }, function (err) {
            res.send(err);
        });
}

function removeContract(req, res) {
    contractModel
        .removeContract(req.params.contractNum)
        .then(function (contract) {
            res.send(contract);
        }, function (err) {
            res.send(err);
        });
}

function saveFields(req,res){
    var contract = req.body;
    console.log(req.params.contractId);
    contractModel
        .updateBid(bid, req.params.contractNum)
        .then(function (contract) {
            console.log(contract);
            res.send(contract);
        }, function (err) {
            console.log(err);
            res.send(err);
        });
}
