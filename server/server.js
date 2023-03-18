require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const FavouriteModel = require("./model/favourite.model");

const CityModel = require("./model/city.model");
const ContactModel = require("./model/contact.model");

const { MONGO_URL, PORT = 4000 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

// FRONTEND REQUEST EXAMPLE ----> /api/cities?name=asc
// FRONTEND REQUEST EXAMPLE ----> /api/cities?country=desc
// if there is no req.query it send back all the cities
app.get("/api/cities", async (req, res) => {
  const cities = await CityModel.find({}).sort(req.query);
  res.json(cities);

  // first naive implementation
  /*if (req.query.name) {
    const cities = await CityModel.find({}).sort({ name: req.query.name });
    res.json(cities);
  } else if (req.query.country) {
    const cities = await CityModel.find({}).sort({ country: req.query.country });
    res.json(cities);
  } else if (req.query.reviews) {
    const cities = await CityModel.find({}).sort({ reviews: req.query.reviews });
    res.json(cities);
  } else {
    const cities = await CityModel.find({});
    res.json(cities);
  }*/
});

// ADDING NEW ITEMS TO AN EXISTING ARRAY IN THE DATABASE
// BOTH WORKS FINE
// 1. SOLUTION
/*app.post('/api/cities/:id/sights', async (req, res) => {
  const city = await CityModel.findById(req.params.id);
  city.sights.push(req.body.sight);
  await city.save();
  res.json(city);
});*/

// 2. SOLUTION
app.post("/api/cities/:id/sights", async (req, res) => {
  const city = await CityModel.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { sights: req.body.sight } },
    { new: true }
  );

  res.json(city);
});

// REMOVING ITEMS FROM AN EXISTING ARRAY IN THE DATABASE
// $pull is searching for the given parameter
// if we want to remove an object from an array we should use this way
// { $pull: { sights: {name: 'John'} } }, OR
// { $pull: { sights: req.body } }, where the body is {name: 'John'} ----> in JSON format {"name": "John"}
app.delete('/api/cities/:id/sights', async (req, res) => {

  const city = await CityModel.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { sights: req.body.sight } },
    { new: true }
  );

  res.json(city);
});

app.get("/api/bucketlist", async (req, res, next) => {
  try {
    if (req.query.cityid) {
      const cityId = req.query.cityid;
      const fav = await FavouriteModel.findOne({ city: cityId });
      res.json(fav);
    } else {
      const list = await FavouriteModel.find().populate("city");
      res.json(list);
    }
  } catch (error) {
    return next(error);
  }
});

app.post("/api/bucketlist", async (req, res, next) => {
  const fav = req.body;

  try {
    const saved = await FavouriteModel.create(fav);
    res.json(saved);
  } catch (error) {
    return next(error);
  }
});

app.patch("/api/bucketlist/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
      const updated = await FavouriteModel.findOneAndUpdate(
        { _id: id },
        { $set: req.body }, // vagy { $set: ...req.body } ???
        { new: true }
      ).populate("city");

      res.json(updated);
  } catch (error) {
    return next(error);
  }
});

// first naive implementation
// app.patch("/api/bucketlist/:id", async (req, res, next) => {
//   const id = req.params.id;

//   try {
//     if (req.body.comment || req.body.rating) {
//       const updated = await FavouriteModel.findOneAndUpdate(
//         { _id: id },
//         { $set: req.body },
//         { new: true }
//       ).populate("city");

//       res.json(updated);

//     } else {
//       const fav = await FavouriteModel.findById(id).populate("city");
//       fav.visited = !fav.visited;
//       const updated = await fav.save();

//       res.json(updated);
//     }
//   } catch (error) {
//     return next(error);
//   }
// });

app.delete("/api/bucketlist/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const fav = await FavouriteModel.findById(id);
    const deleted = await fav.delete();
    res.json(deleted);
  } catch (error) {
    return next(error);
  }
});

app.get("/api/contacts", async (req, res) => {
  const contacts = await ContactModel.find({});
  res.json(contacts);
});

app.post("/api/contacts", async (req, res, next) => {
  try {
    const saved = await ContactModel.create(req.body);
    res.json(saved);
  } catch (error) {
    return next(error);
  }
});

const main = async () => {
  await mongoose
    .connect(MONGO_URL, {
      family: 4,
    })
    .then(() => console.log("Connected to MongoDB"));

  app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
};

main().catch((error) => console.error(error));
