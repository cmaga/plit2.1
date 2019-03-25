var mongoose = require('mongoose');
var counterSchema = require('./counter.schema.server');
var counterModel = mongoose.model('CounterModel', counterSchema);

counterModel.getCount = getCount;
counterModel.setCount = setCount;
counterModel.setCurrentYear = setCurrentYear;
counterModel.incrCount = incrCount;
counterModel.incrCurrentYear = incrCurrentYear;

module.exports = counterModel;

function getCount() {
    return counterModel.findOne({});
}

function setCount(num) {
    return counterModel.update({}, {$set: {"Count": num}});
}
function setCurrentYear(num) {
    return counterModel.update({}, {$set: {"CurrentYear": num}});
}
function incrCount() {
    console.log("+1");
    return counterModel.findOneAndUpdate({},{$inc:{"Count": 1}},{"new":true});

}
function incrCurrentYear() {
    console.log("The year has changed since the last bid number was generated. Incrementing the current year");
    return counterModel.findOneAndUpdate({},{$inc: {"CurrentYear": 1}},{"new": true});
}
