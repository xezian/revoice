const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clipSchema = new Schema({
    originalClip: { type: String, required: true},
    topAttempt: { type: String, required: false},
    secondPlace: { type: String, required: false},
    thirdPlace: { type: String, required: false},
    lastPlace: { type: String, required: false},
});
const Clip = mongoose.model("Clip", clipSchema);
module.exports = Clip;