require("dotenv").config();
const mongoose = require("mongoose");
const cities = require("./cities.json");
const FavouriteModel = require("../model/favourite.model");
const CityModel = require("../model/city.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const populateCities = async () => {
  await CityModel.deleteMany({});

  await CityModel.create(...cities);
  console.log("Cities created");
};

const main = async () => {
  await mongoose.connect(mongoUrl, {family:4});

  await populateCities();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});