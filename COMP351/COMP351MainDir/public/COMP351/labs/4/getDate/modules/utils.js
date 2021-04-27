function date(name){
    
    let date = new Date();
    let output = `Hello ${name}, here is the server's current date and time: ${date.toString()}`;
    return output;
}

exports.date = date;