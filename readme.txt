A NodeJS, MongoDB and Express website/server made for a friend's video hosting website.

INSTRUCTIONS:

*****How to Change Admin Password: 
Admin password is needed to upload website. To set admin pass, write your password into the password variable and run the following command from a terminal:
"node setPass.js"
This will create the salt and hash for your admin login.
DO NOT FORGET to erase the hardcoded text password in setPass.js. This is not best practice for setting passwords but it is 1am and I am tired. It will work

*****How to Set MongoDB Connection String:
MongoDB connection string should be copy pasted into the mongocert.js file under the connect variable. It should be surrounded by " marks.

*****Generate Https certifications:
Run genHttpKeys.sh in a linux terminal with ./

*****Set Server Port:
Change the PORT variable in app.js (on line 34)

*****Seed database (for first launch):
Seed is a way to have the server start with videos uploaded. It will automatically delete anything in the database then "seed" it with what is defined in the
seed.js file. Follow the below instructions to launch server with several videos.
1). Upload videos into public/videos and thumbnails into public/videos/thumbnails with the names of your choice
2). Open seed.js in favorite text editor
3). Notice the "data" variable. Which is an array (wrapped in []) of javascript objects (wrapped in {}).
4). By default each of the objects attributes (title,desc,ect) are empty strings except the timestamp.
5). For the first video you upload change the attributes. To add another video simply add a comma after the closing bracket (}) and add another.

EXAMPLE OF SEED FOR 2 VIDEOS:
(NOTE: path must be defined with public as root! This is not done when uploading through the site as the server does this for you. But is necessary in seed)
------------------------------------------------------------------
var data = [
    {
        title: "Cliff",
        upload_date: tools.timeStamp(),
        desc: "this is the description I want desplayed on the cliff video",
        path: "public/videos/cliff.mp4",
        thumbnail_path: "public/videos/thumbnails/cliffThumb.gif"
    },
    {
        title: "A Second Video",
        upload_date: tools.timeStamp(),
        desc: "This is the second video. When the server is started both of these videos will be uploaded already. You can continue this list of objects to start server with as many videos as you want",
        path: "public/videos/secondVid.ogg",
        thumbnail_path: "public/videos/thumbnails/secondThumb.png"
    }
];

WE ARE NOT DONE....
6). After saving the seed.js file go to the app.js file and to line #49. Remove the "//" in front of "seed();". Save and run server from terminal with "node app.js"
7). Go back to app.js and return the "//" in front of "seed();" on line #49. If left uncommented it will run every time you start the server which will reset the video content to what is defined in the seed file. You ONLY want this function running on first launch
DONE!

*****Uploading Videos:
1). add your videos to the public/videos directory and thumbnails to the public/videos/thumbnails directory. If they do not exist, create them.
2). Once server is running (run node app.js in terminal). Go to the WEBSITE_NAME/videos/new in browser.
3). Enter the video path from the videos folder mentioned above WITHOUT extension. I know this is confusing but it made sense when I made it. So if you have "cliff.mp4" in public/videos. Enter in the video path box just "cliff". It will automatically be assigned ".mp4" and ".oog" as extensions. No other types are supported.
4). Enterh the thumbnail path from the videos/thumbnails folder. But this time WITH extension since thumbnails, unlike videos support whatever image types the browser will support. So if you have "cliff.png" in public/videos/thumbnails. Then enter "cliff.png" in the box prompting for path.
5). Then enter your admin password you set above, as well as a title and description and click the button. Your video should be posted!


Note to people snooping around:

There are some HTTPS keys in the branch history. Not using them anymore. So don't try anything