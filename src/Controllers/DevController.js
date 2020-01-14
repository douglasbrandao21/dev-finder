const axios = require("axios");

const Dev = require("../Models/Dev");

module.exports = {
  store: async (request, response) => {
    const { github_username, techs } = request.body;

    const apiResponse = await axios.get(
      `https://api.github.com/users/${github_username}`
    );

    const { name = login, avatar_url, bio } = apiResponse.data;

    const techsArray = techs.split(",").map(tech => tech.trim());

    console.log(name, avatar_url, bio, techsArray);

    const dev = await Dev.create({
      name,
      github_username,
      avatar_url,
      bio,
      techs: techsArray
    });

    return response.json(dev);
  }
};
