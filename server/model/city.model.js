const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CitySchema = new Schema({
    name: String,
    country: String,
    continent: String,
    timezone: String,
    population: Number,
    official_language: String,
    currency: String,
    reviews: Number,
    sights: [String],
    image_url: String,
    color: String,
});

module.exports = mongoose.model("City", CitySchema);