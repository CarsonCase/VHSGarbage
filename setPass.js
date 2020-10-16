
//                                              WRITE YOUR PASSWORD HERE
//******************************************************************************************************************************** */
var pass = "NiceTryNerd";  //DELETE THIS ONCE YOU GENERATE HASH PLEASE ;) I'm too lazy to make console input right now
//******************************************************************************************************************************** */


//Set SALT ROUNDS
const SALT_ROUNDS = 10;

var bcrypt = require("bcrypt");
var fs     = require("fs");


var salt = bcrypt.genSaltSync(SALT_ROUNDS);

var admin = {
    "password":bcrypt.hashSync(pass,salt),
    "salt": salt
};

let data = JSON.stringify(admin);
fs.writeFileSync('admin.json', data);


