const axios = require("axios");

const Dev = require("../Models/Dev");

const stringToArray = require("../utils/stringToArray");
const getLocation = require("../utils/getLocation");

const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    try {
      let dev = await Dev.findOne({ github_username });

      if (!dev) {
        const apiResponse = await axios.get(
          `https://api.github.com/users/${github_username}`
        );

        const { name = login, avatar_url, bio } = apiResponse.data;

        const techsArray = stringToArray(techs);

        const location = getLocation(latitude, longitude);

        dev = await Dev.create({
          name,
          github_username,
          bio,
          avatar_url,
          techs: techsArray,
          location
        });
        const connections = findConnections(
          { latitude, longitude },
          techsArray
        );

        sendMessage(connections, "new-dev", dev);
      }
      return response.json(dev);
    } catch (error) {
      return response.json(error);
    }
  },

  async index(request, response) {
    try {
      const devs = await Dev.find();

      return response.json(devs);
    } catch (error) {
      return response.json(error);
    }
  },

  async destroy(request, response) {
    try {
      const _id = request.params.id;

      await Dev.findOneAndDelete({ _id });

      return response.json({ message: "Dev was removed!" });
    } catch (error) {
      return response.json(error);
    }
  }
};
