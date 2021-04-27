const functions = require('firebase-functions');

const http = require('http');
const url = require('url');
const fs = require('fs');
let util = require("./modules/utils");


exports.serverside = functions.https.onRequest((req, res) => {
    const q = url.parse(req.url, true);


    if(q.pathname.includes("/COMP351/labs/4/writeFile") == true){
      res.setHeader*('Access-Control-Allow-Origin: *');
      res.setHeader('Content-Type', 'text/html');
          // Request methods you wish to allow
    res.setHeader('X-Content-Type-Options', nosniff);

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

      //   res.status(200).send(`<!doctype html>
      //   <head>
      //     <title>Time</title>
      //   </head>
      //   <body>
      //     Just to show the page loaded
      //   </body>
      // </html>`);
        fs.appendFile('./file.txt', q.query.text + "\r\n", function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        return res.end();
    }
    else if(q.pathname.includes("/COMP351/labs/4/readFile/file.txt")==true)
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
    else if(q.pathname.includes("/COMP351/labs/4/getDate")==true){
    // let q = url.parse(req.url,true);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(util.date(q.query.name));
    res.end();
    }
    else{
        res.status(200).send(`<!doctype html>
        <head>
          <title>Time</title>
        </head>
        <body>
          Home
        </body>
      </html>`);
      return res.end();
    }
});