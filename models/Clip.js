const ko = require('nekodb');

const Clip = ko.Model('Clip',{
    originalClip: ko.String,
    date: ko.Date.now(),
    topTry: ko.String.default('top try placeholder'),
    secondBest: ko.String.default('second best'),
    firstWorst: ko.String.default('first worst'),
});

module.exports = Clip;