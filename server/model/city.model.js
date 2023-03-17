const mongoose = require("mongoose");
const { Schema } = mongoose;

const CitySchema = new Schema({
  name: String,
  country: String,
  continent: String,
  timezone: String,
  population: Number,
  officialLanguage: String,
  currency: String,
  reviews: Number,
  sights: [String],
  imageUrl: String,
  color: String,
});

module.exports = mongoose.model("City", CitySchema);
