const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const server = express();

server.listen(3333);
server.use(cors());
server.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-oa370.mongodb.net/devFinder?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

server.use(routes);
