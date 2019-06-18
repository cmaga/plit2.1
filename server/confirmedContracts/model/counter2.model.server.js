var mongoose = require('mongoose');
var counter2Schema = require('./counter2.schema.server');
var counter2Model = mongoose.model('Counter2Model', counter2Schema);

counter2Model.getCount = getCount;
counter2Model.setCount = setCount;
counter2Model.setCurrentYear = setCurrentYear;
counter2Model.incrCount = incrCount;
counter2Model.incrCurrentYear = incrCurrentYear;

module.exports = counter2Model;

function getCount() {
    return counter2Model.findOne({});
}

function setCount(num) {
    return counter2Model.update({}, {$set: {"Count": num}});
}
function setCurrentYear(num) {
    return counter2Model.update({}, {$set: {"CurrentYear": num}});
}
function incrCount() {
    console.log("+1");
    return counter2Model.findOneAndUpdate({},{$inc:{"Count": 1}},{"new":true});

}
function incrCurrentYear() {
    console.log("The year has changed since the last bid number was generated. Incrementing the current year");
    return counter2Model.findOneAndUpdate({},{$inc: {"CurrentYear": 1}},{"new": true});
}
