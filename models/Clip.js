const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clipSchema = new Schema({
    audioChunks: { type: Array, required: true}
});
const Clip = mongoose.model("Clip", clipSchema);
module.exports = Clip;