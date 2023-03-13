const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const favouriteSchema = new Schema({
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City'
  },
  comment: String,
  rating: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Favourite', favouriteSchema);