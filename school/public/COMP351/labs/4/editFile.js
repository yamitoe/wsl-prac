const http = require('http');
const url = require('url');
const fs = require('fs');
http.createServer(function (req, res) {
    const q = url.parse(req.url, true);
if(q.pathname == "/COMP351/labs/4/writeFile/"){
    
    fs.appendFile('./file.txt', q.query.text + "\r\n", function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    return res.end();
}
else if(q.pathname == "/COMP351/labs/4/readFile/file.txt")
{
    fs.readFile('./file.txt',function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });   
}
}).listen(8080);
console.log("listening");
