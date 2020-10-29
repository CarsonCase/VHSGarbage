A NodeJS, MongoDB and Express website/server made for a friend's video hosting website.

INSTRUCTIONS:

How to Change Admin Password: 
Admin password is needed to upload website. To set admin pass, write your password into the password variable and run the following command from a terminal:
"node setPass.js"
This will create the salt and hash for your admin login.
DO NOT FORGET to erase the hardcoded text password in setPass.js. This is not best practice for setting passwords but it is 1am and I am tired. It will work

How to Set MongoDB Connection String:
MongoDB connection string should be copy pasted into the mongocert.js file under the connect variable. It should be surrounded by " marks.

Generate Https certifications:
Run genHttpKeys.sh in a linux terminal with ./

Set Server Port:
Change the PORT variable in app.js (on line 34)

There are some HTTPS keys in the branch history. Not using them anymore. So don't try anything