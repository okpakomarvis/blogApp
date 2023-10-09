const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routers = require("./router/router");
const logger = require("morgan");
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;
const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL;

app.use(bodyParser.json());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v1", routers);


mongoose.connect(MONGO_DB_CONNECTION_URL).then(()=>{
  app.listen(port);
  console.log(`server is running on ${port}`);
  console.log("connected");
});

module.exports = app;

