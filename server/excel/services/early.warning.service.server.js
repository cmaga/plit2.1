var app = require('../../../express');
var earlyWarningModel = require('../model/early.warning.model.server');

app.get('/api/early', getEarlyWarningData);

function getEarlyWarningData(req, res) {
    console.log('service called');
    earlyWarningModel
        .getEarlyWarningData()
        .then(function (data) {
            res.send(data);
        }, function (err) {
            res.send(err);
    });
}

