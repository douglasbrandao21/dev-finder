module.exports = string => {
  return string.split(",").map(tech => tech.trim());
};
