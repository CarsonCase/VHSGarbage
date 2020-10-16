const fs = require('fs');

let rawdata = fs.readFileSync('admin.json');
let login = JSON.parse(rawdata);

function test(){
    console.log("Hello");
}

module.exports = login;