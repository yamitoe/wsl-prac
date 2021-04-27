//Firebase
const functions = require('firebase-functions');

const express = require('express');
const app = express();
//TO hide connection password
const dotenv = require('dotenv').config();
app.use(express.json()) ;
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  // res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});
var pgp = require('pg-promise')(/* options */) ;

const cn = {
    host: process.env.host,
    database: process.env.database,
    user: process.env.user, 
    password: process.env.password,
};

var db = pgp(cn);

 
app.get('/', function (req, res) {
    let x = async ()=>{
      await db.any('select * from questionanswer')
      .then(function (data) {
        res.send(data);
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      })}
    x();


 
})

app.post('/', function (req, res) {
    let x = async ()=>{
      // console.log(req.body);
      await db.any(
        'INSERT INTO questionanswer (answers) VALUES ($1:json)', [req.body])
      .then(function (data) {
        res.send('Got a POST request')
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      })}
    x();
    
})

app.put('/', function (req, res) {
  let x = async ()=>{
    await db.any(
      'UPDATE questionanswer SET answers =($1:json) WHERE qid = $2 RETURNING qid', [req.body.anws,req.body.qid])
    .then(function (data) {
      res.send('Got a POST request')
    })
    .catch(function (error) {
      console.log('ERROR:', error);
    })}
  x();
})

app.delete('/', function (req, res) {
  // console.log("value is what now?");
  // console.log(req.body);
  let x = async ()=>{
    await db.any(
      'DELETE FROM questionanswer WHERE qid = $1', [req.body.qid])
    .then(function (data) {
      res.send('Got a POST request')
    })
    .catch(function (error) {
      console.log('ERROR:', error);
    })}
  x();
})

// console.log("listening on http://localhost:8080/")
 exports.app = functions.https.onRequest(app);
// app.listen(8080)