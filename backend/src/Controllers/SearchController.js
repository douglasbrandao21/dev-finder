const Dev = require("../Models/Dev");

const stringToArray = require("../utils/stringToArray");

module.exports = {
  async index(request, response) {
    try {
      const { latitude, longitude, techs } = request.query;

      const techsArray = stringToArray(techs);

      const devs = await Dev.find({
        techs: {
          $in: techsArray
        },
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            $maxDistance: 10000
          }
        }
      });

      return response.json(devs);
    } catch (error) {
      return response.json(error);
    }
  }
};
