const express = require("express");
var http = require('http');
const bodyParser = require("body-parser");


const createHttpError = require("http-errors");
var logger = require("morgan");
var cookieParser = require('cookie-parser');
var Router = require ('./routes/index');

const PORT = 8080;

const app = express()
app.use(bodyParser.json())
const server = http.createServer(app);
server.listen(PORT,()=>{
  console.log("your  server start on Port-No :",PORT)
})

app.use('/',Router)
