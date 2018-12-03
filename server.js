
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const moment = require("moment")
const cors = require("cors")
const files = require('./files.js')
const db = require('./db.js');
const app = express()

console.log(new Date());


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())

app.use(cors())
 
// parse application/json
app.use(bodyParser.json());

app.get('/api/user/score', async (req, res) => {
  let users = await db.getUsersByScore();
  res.send(users);
});

app.get('/api/folder/score', async (req, res) => {
  let users = await db.getUsersScoreByFolder();
  res.send(users);
});

app.get('/api/score/folder', cors(), async (req, res) => {
  let users = await db.getPublicUsersScoreByFolder();
  res.send(users);
});

app.get('/api/score/',cors(), async (req, res) => {
  let users = await db.getPublicUsersByScore();
  res.send(users);
});




app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
})

const port = process.env.PORT || 5000;
app.listen(port);

let http = require("http");

setInterval(function() {
    http.get("http://kode24-signup.herokuapp.com/");
}, 300000) // every 5 minutes (300000)