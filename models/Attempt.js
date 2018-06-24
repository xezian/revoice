const ko = require('nekodb');

const Attempt = ko.Model('Attempt', {
    attempt: ko.String,
    score: ko.Number,
    awsEtag: ko.String,
    date: ko.Date.now(),
    clip: ko.models.Clip,
    $$indexes: {
        clip: {
            unique: false,
        },
    },
});

module.exports = Attempt;