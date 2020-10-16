var mongoose = require("mongoose");

var videoSchema = new mongoose.Schema({
    title: String,
    upload_date: String,
    desc: String,
    path: String,
    thumbnail_path: String,
    comments: 
    [
        {
            author: String,
            content: String,
            timestamp: String
        }
    ]
});

module.exports = mongoose.model("Video",videoSchema);