var mongoose = require('mongoose');
var cSchema = require('./contract-schema');
var contract2Model = mongoose.model('Contract2Model', cSchema); //for the sake of a smaller name and a relationship with count2 confirmed contracts model is called contract2model.

contract2Model.createContract = createContract;
contract2Model.getContracts = getContracts;
contract2Model.getSpecificContract = getSpecificContract;
contract2Model.updateContract = updateContract;
contract2Model.removeContract = removeContract;
module.exports = contract2Model;

function createContract(contract) {
    //bid.Timeframe = Date.parse(bid.Timeframe);
    console.log('model');
    console.log("server" + JSON.stringify(contract));

    return contract2Model.create(contract);
}

function getContracts() {
    return contract2Model.find();
}

function getSpecificContract(contractNum) {
    return contract2Model.find({"Contract_Num": contractNum});
}

function updateContract(contract, contractNum) {
    console.log(contractId);
    console.log("UPDATING " + JSON.stringify(contract));
    return contract2Model.findOneAndUpdate({"Contract_Num": contractNum}, {$set: contract}, {new: true}, (err, doc) => {
        if (err) {
            console.log(`the contract id we are searching for is ${contractNum}`);
            console.log("something went wrong when updating data")
        }
        console.log(doc);
    });
}
function removeContract(contractNum) {
    return contract2Model.remove({"Contract_Num": contractNum});
}