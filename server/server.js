require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const FavouriteModel = require("./model/favourite.model");

const CityModel = require('./model/city.model');
const ContactModel = require('./model/contact.model');

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose
  .connect(MONGO_URL, {
    family: 4,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

app.get("/api/cities", async (req, res) => {
  const cities = await CityModel.find({});
  res.json(cities);
});

app.get("/api/bucketlist", async (req, res) => {

  const list = await FavouriteModel.find().populate("city");
  res.json(list);

  // try {
  //   const list = await FavouriteModel.find().populate("city");
  //   res.status(200).json(list);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ success: false });
  // }
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
    const comment = req.body.comment;

    const bucketlistItem = await FavouriteModel.findOneAndUpdate(
      { _id: id},
      { comment },
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

app.patch("/api/bucketlist/update-visited/:id", async (req, res) => {
  const id = req.params.id;

  const bucketItem = await FavouriteModel.findById(id);

  //erre is azért van szükség, mert elvileg nem tudom módosítani
  // egy findByIdandUpdateben a visited értékét
  // így meg lehet toggle-ni
  bucketItem.visited = !bucketItem.visited;
  const saved = await bucketItem.save();

  res.json(saved);
});

app.get("/api/contacts", async (req, res) => {
  const contacts = await ContactModel.find({});
  res.json(contacts);
});

app.post("/api/contacts", async (req, res, next) => {
  try {
    const saved = await ContactModel.create(req.body);
    res.json(saved)
  } catch (error) {
    return next(error)
  }
});

app.listen(4000, () => console.log("The server is running on port 4000"));
