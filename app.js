/*************************************************************
 * VHS GARBAGE APP.JS
 * 
 * Author: Carson Case
 * Started: Sept,24,2020
 * 
 * TO-DOS TO PORT TO NEEL
 * -setup real paypal
 * 
 * START REQUIRES BELOW
 * ******************************************************** */
const express     = require("express"),
    mongoose    = require("mongoose"),
    path        = require("path"),
    bodyParser  = require("body-parser"),
    bcrypt      = require("bcrypt"),
    alert       = require("alert"),
    //MODELS
    Videos      = require("./models/video"),
    Messages    = require("./models/message"),
    //OTHER
    seed        = require("./seed"),
    cert        = require("./mongocert"),
    admin       = require("./adminPass"),
    tools       = require("./public/tools");



/*************************************************************
 *MISC SETUP
 * ******************************************************** */
//set up express
var app     = express();
const PORT  = 8080;
//Set Character limits
const nameLimit = 30;
const contentLimit = 250;
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
//Connect to DB
mongoose.connect(cert, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

//Set up HTTPS
var fs = require('fs');
var https = require('https');


//seed DB
//seed();

/*************************************************************
 *app.use
 * ******************************************************** */
app.use(express.static(path.join(__dirname,"public")));
/*************************************************************
 *GET ROUTES
* ******************************************************** */

//Homepage
app.get("/",(req,res)=>{
    res.render("index.ejs");
});

//About
app.get("/about",(req,res)=>{
    res.render("about/index.ejs");
})
//Videos index
app.get("/videos",(req,res)=>{
    Videos.find((err,videos)=>{
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            res.render("videos/index.ejs",{videos:videos});
        }
    });
});
//post video
app.get("/videos/new",(req,res)=>{
    res.render("videos/new.ejs");
});

//Videos show
app.get("/videos/:id",(req,res)=>{
    Videos.findById(req.params.id,(err,video)=>{
        if(err){
            console.log(err);
        }else{
            res.render("videos/show.ejs",{video:video});
        }
    });
});

//messageboard
app.get("/message-board",(req,res)=>{
    Messages.find((err,messages)=>{
        if(err){
            console.log(err);
        }else{
            res.render("messageboard/index.ejs",{messages:messages});
        }
    });
});


/*************************************************************
 *POST ROUTES
* ******************************************************** */

//post comment
app.post("/videos/:id",(req,res)=>{
    if(tools.characterLimit(req.body.user,nameLimit) && tools.characterLimit(req.body.content,contentLimit)){
        Videos.findById(req.params.id,(err,video)=>{
            if(err){
                console.log(err);
            }else{
                video.comments.push({
                    author:req.body.user,
                    content: req.body.content,
                    timestamp: tools.timeStamp()
                });
                video.save((err,result)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log("New comment on a video");
                        res.redirect("/videos/"+req.params.id);    
                    }
                });
            }
            
        });
    }else{
        alert("Name can be no longer than "+nameLimit+" characters\nAnd content can be no longer than "+contentLimit);
        res.redirect("/videos/"+req.params.id);
    }
});

//post message
app.post("/message-board",(req,res)=>{
    if(tools.characterLimit(req.body.user,nameLimit) && tools.characterLimit(req.body.content,contentLimit)){
        Messages.create({
            author:req.body.user,
            content: req.body.content,
            timestamp: tools.timeStamp()
    
        },(err,message)=>{
            if(err){
                console.log(err);
            }else{
                console.log("New post to message-board");
                console.log(message);
            }
            res.redirect("/message-board");
        });
    
    }else{
        alert("Name can be no longer than "+nameLimit+" characters\nAnd content can be no longer than "+contentLimit);
        res.redirect("/message-board");
    }
});


//post video
app.post("/videos",(req,res)=>{
    //THIS IS SUPER JANKY BUT HONESTLY THE BEST/ MOST LIGHTWEIGHT SOLUTION. PLEASE DON'T HURT ME
    //The salt and hash is hardcoded. What? Why does it matter? There's only one admin anyway. Sue me.
    var salt = admin["salt"];
    var hash = bcrypt.hashSync(req.body.password,salt);
    var adminHash = admin["password"];
    if(hash===adminHash){
        Videos.create({
            title: req.body.title,
            upload_date: tools.timeStamp(),
            desc: req.body.desc,
            path: "videos/"+req.body.path,
            thumbnail_path: "videos/thumbnails/"+req.body.thumbnail_path
        },(err,video)=>{
            if(err){
                console.log(err);
            }else{
                console.log("New video posted!");
                console.log(video);
            }
            res.redirect("/videos");
        });
    }else{
        res.redirect("https://www.fbi.gov/");
    }
});


//Start server
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(PORT, function () {
    console.log('Vhs Garbage Server Running on Port: '+PORT);
  });