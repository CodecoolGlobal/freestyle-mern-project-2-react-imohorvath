require("dotenv").config();
const mongoose = require("mongoose");
const cities = require("./cities.json");
const CityModel = require("../model/city.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

//Create a random hex color
//original const hexValues = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"]; 
const createRandomHex = () => {
  const hexValues = [4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

  const hexCode =
    "#" + [...Array(6)].map(() => hexValues[Math.floor(Math.random() * hexValues.length)]).join("");

  return hexCode;
};

const randomNumber = (min, max, precision) => {
  return Math.floor(Math.random() * (max * precision - min * precision) + min * precision) / (1 * precision)
}

const populateCities = async () => {
  await CityModel.deleteMany({});
  const citylist = cities.map(city => ({
    ...city,
    reviews: randomNumber(5, 10, 10),
    color: createRandomHex()
  }))
  await CityModel.create(citylist);
  console.log("Cities created");
};

const main = async () => {
  await mongoose.connect(mongoUrl, { family: 4 });

  await populateCities();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
