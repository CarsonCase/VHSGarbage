var mongoose = require("mongoose"),
    Video    = require("./models/video"),
    tools    = require("./public/tools");

var data = [
    {
        title: "Cliff",
        upload_date: tools.timeStamp(),
        desc: "lorem",
        path: "videos/cliff",
        thumbnail_path: "videos/thumbnails/cliff.gif"
    },
    {
        title: "fathers",
        upload_date: tools.timeStamp(),
        desc: "lorem",
        path: "videos/fathers",
        thumbnail_path: "videos/thumbnails/fathers.gif"
    },
    {
        title: "Gnet",
        upload_date: tools.timeStamp(),
        desc: "lorem",
        path: "videos/gnet",
        thumbnail_path: "videos/thumbnails/gnet.gif"
    },
    {
        title: "goodnight",
        upload_date: tools.timeStamp(),
        desc: "lorem",
        path: "videos/goodnight",
        thumbnail_path: "videos/thumbnails/goodnight.gif"
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
