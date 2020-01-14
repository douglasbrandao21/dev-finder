const { Router } = require("express");

const DevController = require("./Controllers/DevController");

const routes = Router();

routes.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

routes.post("/devs", DevController.store);

module.exports = routes;
