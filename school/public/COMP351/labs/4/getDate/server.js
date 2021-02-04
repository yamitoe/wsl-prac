let http = require('http');
let util = require("./modules/utils");
let url = require("url");

http.createServer(function (req, res) {
    let q = url.parse(req.url,true);
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(util.date(q.query.name));
  res.end();
}).listen(8080);

console.log("listening");