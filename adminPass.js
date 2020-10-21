const fs = require('fs');

let rawdata = fs.readFileSync('admin.json');
let login = JSON.parse(rawdata);


module.exports = login;