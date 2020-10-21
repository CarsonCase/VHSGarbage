var mongoose = require("mongoose"),
    Video    = require("./models/video"),
    tools    = require("./public/tools");

var data = [
    {
        title: "",
        upload_date: tools.timeStamp(),
        desc: "",
        path: "",
        thumbnail_path: ""
    }
];

function seedDb(){
    console.log("Seeding DB...");
    Video.deleteMany({},(err)=>{
        if(err){console.log(err);
        }
    });

    console.log("removed db videos");

    data.forEach((vid)=>{
        Video.create(vid,(err,video)=>{
            if(err){
                console.log(err);
            }else{
                console.log("created sample video in database");
            }
        });
    });
}

module.exports = seedDb;
