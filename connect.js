const mongoose = require("mongoose");

async function connectedMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = { connectedMongoDB };
