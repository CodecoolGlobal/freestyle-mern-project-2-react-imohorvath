require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const FavouriteModel = require("./model/favourite.model");
const CityModel = require('./model/city.model');

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
  .connect(
    MONGO_URL,
    {
      family: 4,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

app.get("/api/cities", async (req, res) => {
  const cities = await CityModel.find({});
  res.json(cities);
});

// app.post("/api/bucketlist", (req, res) => {

//   const favourite = new Favourite({
//     name: req.body.name,
//     country: req.body.country,
//     comment: req.body.comment,
//     rating: req.body.rating,
//     createdAt: Date.now(),
//   });

//   favourite
//     .save()
//     .then((fav) => res.json(fav))
//     .catch((err) => res.status(400).json({ success: false }));
// });

app.post("/api/bucketlist", async (req, res) => {
  try {
    const favourite = new FavouriteModel({
      name: req.body.name,
      country: req.body.country,
      comment: req.body.comment,
      rating: req.body.rating,
      createdAt: Date.now(),
    });

    const fav = await favourite.save();
    res.status(200).json(fav);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
})

app.get("/api/bucketlist", async (req, res) => {
  try {
    const list = await FavouriteModel.find({});
    res.status(200).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.delete("/api/bucketlist", async (req, res) => {
  try {
    const id = req.body.id;

    const fav = await FavouriteModel.findByIdAndDelete(id);
    res.status(200).json(fav);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.patch("/api/bucketlist", async (req, res) => {
  try {
    const id = req.body.id;
    const comment = req.body.comment;

    const fav = await FavouriteModel.findByIdAndUpdate(id, { comment }, { new: true });
    res.status(200).json(fav);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.listen(4000, () => console.log("The server is running on port 4000"));
