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

// api/cities?name=asc
app.get("/api/cities", async (req, res) => {
  const cities = await CityModel.find({}).sort(req.query);

  /*if (req.query.name) {
    cities = await CityModel.find({}).sort({ name: req.query.name });
  } else if (req.query.country) {
    cities = await CityModel.find({}).sort({
      country: req.query.country,
    });
  } else if (req.query.reviews) {
    cities = await CityModel.find({}).sort({
      reviews: req.query.reviews,
    });
  } else {
    cities = await CityModel.find({});
  }*/

  res.json(cities);
});

app.get("/api/bucketlist", async (req, res, next) => {
  try {
    if (req.query.cityid) {
      const { cityid } = req.query;
      const bucketlistItem = await FavouriteModel.findOne({ city: cityid });
      res.json(bucketlistItem);
    } else {
      const list = await FavouriteModel.find().populate("city");
      res.json(list);
    }
  } catch (error) {
    return next(error);
  }

  // let query = FavouriteModel.find();
  // if (req.query.name) {
  //   query = query.find({name: req.query.name});
  // }
  // if (req.query.price) {
  //   query = query.find({name: req.query.price});
  // }
  // if (req.query.order) {
  //   query = query.sort({[req.query.order]: 'ASC'});
  // }
  // if (req.query.order) {
  //   query = query.limit(10);
  // }
  // const favourites = await query;
});

app.post("/api/bucketlist", async (req, res, next) => {
  const bucketlistItem = req.body;

  try {
    const saved = await FavouriteModel.create(bucketlistItem);
    res.json(saved);
  } catch (error) {
    return next(error);
  }
});

app.patch("/api/bucketlist/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const bucketlistItem = await FavouriteModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    res.json(bucketlistItem);
  } catch (error) {
    return next(error);
  }
});

app.delete("/api/bucketlist/:id", async (req, res, next) => {
  try {
    const bucketlistItem = await FavouriteModel.findById(req.params.id);
    const deleted = await bucketlistItem.delete();
    res.json(deleted);
  } catch (error) {
    return next(error);
  }
});

/*app.patch("/api/bucketlist/update-visited/:id", async (req, res) => {
  const id = req.params.id;
  const bucketItem = await FavouriteModel.findById(id);
  // erre is azért van szükség, mert elvileg nem tudom módosítani
  // egy findByIdandUpdateben a visited értékét így meg lehet toggle-ni
  bucketItem.visited = !bucketItem.visited;
  const saved = await bucketItem.save();

  res.json(saved);
});*/

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
