module.exports = (latitude, longitude) => {
  return {
    type: "Point",
    coordinates: [longitude, latitude]
  };
};
