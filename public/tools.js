/*************************************************************
 *FUNCTIONS
* ******************************************************** */
function test(){
    console.log("test");
}
function characterLimit(input,limit){
    if(input.length <= limit){
        return true;
    }else{
        return false;
    }
}

function timeStamp(){
    var d = new Date();
    return d.toLocaleTimeString() +" " + d.toLocaleDateString();
}


module.exports = {characterLimit, 
    timeStamp,
     test};