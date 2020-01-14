const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");

const server = express();

server.listen(3333);
server.use(express.json());

mongoose.connect(
  "mongodb+srv://week10:week10>@cluster0-oa370.mongodb.net/week10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

server.use(routes);
