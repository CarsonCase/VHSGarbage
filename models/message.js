var mongoose = require("mongoose");

var messageShema = new mongoose.Schema({
    author: String,
    content: String,
    timestamp: String
});

module.exports = mongoose.model("Message",messageShema);