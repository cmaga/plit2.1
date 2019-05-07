var mongoose = require ('mongoose');
var earlyWarningSchema = require('./early.warning.schema.server');
var earlyWarningModel = mongoose.model('earlyWarningModel', earlyWarningSchema);

earlyWarningModel.getEarlyWarningData = getEarlyWarningData;

module.exports = earlyWarningModel;

function getEarlyWarningData() {
    console.log('model calling find');
    return earlyWarningModel.find();
}