const ko = require('../nekodb');

const Clip = ko.Model('Clip', {
    originalClip: ko.String,
    awsEtag: ko.String,
    date: ko.Date.now(),
});

module.exports = Clip;