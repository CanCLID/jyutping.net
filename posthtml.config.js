const urls = require("./src/urls.json");

module.exports = {
  plugins: {
    "posthtml-expressions": { locals: { urls } },
  },
};
