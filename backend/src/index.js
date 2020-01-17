const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const { setupWebsocket } = require("./websocket");

const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const server = http.Server(app);
server.listen(3333);
setupWebsocket(server);

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-oa370.mongodb.net/devFinder?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);
