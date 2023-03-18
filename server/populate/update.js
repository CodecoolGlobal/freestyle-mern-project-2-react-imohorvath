require("dotenv").config();
const mongoose = require("mongoose");

const CityModel = require("../model/city.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

//Create a random hex color
//original const hexValues = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"]; 
const createRandomHex = () => {
  const hexValues = [4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

  const hexCode = '#' + [...Array(6)].map(() => 
    hexValues[Math.floor(Math.random() * hexValues.length)]
  ).join('');

  return hexCode;
};

//Create a random review point --- first naive implementation
//const createRandomReviewPoint = () => {
//  const randomReview = Math.floor(Math.random() * (100 - 50 + 1) + 50) / 10;
//
//  return randomReview;
//};

const randomNumber = (min, max, precision) => {
  return Math.floor(Math.random() * (max * precision - min * precision) + min * precision) / (1 * precision)
};

// This one is good if we want to update many/all items with the same value
// const updateWithRandomValues = async () => {
// await CityModel.updateMany({}, { $set: { color: createRandomHex() } });
// };

const updateAll = async () => {
  const cities = await CityModel.find();

  // first naive implementation --- in this case it runs synchronously one by one
  // at this time it's enough to know
  /*for (const city of cities) {
    city.color = createRandomHex();
    city.reviews= randomNumber(5, 10, 10);
    await city.save();
  }*/

  // better solution --- it enables to run the updating process asynchronously
  const tasks = cities.map((city) => {
    city.color = createRandomHex();
    // city.reviews= randomNumber(5, 10, 10);
    return city.save();
  });

  await Promise.all(tasks);
  console.log("Update done");
};

const main = async () => {
  await mongoose.connect(mongoUrl, {family:4});

  await updateAll();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});