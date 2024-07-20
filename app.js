const express = require("express");
var http = require('http');
const bodyParser = require("body-parser");
var Router = require ('./routes/taskRoute');

const app = express()
app.use(bodyParser.json())
app.use('/',Router)


const PORT = 8080;

const server = http.createServer(app);
app.listen(PORT,()=>{
  console.log("your  server start on Port-No :",PORT)
})

