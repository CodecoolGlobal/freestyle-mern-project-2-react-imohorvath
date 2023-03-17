const mongoose = require("mongoose");
const { Schema } = mongoose;

const favouriteSchema = new Schema({
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City'
  }, // foreign key
  comment: String,
  rating: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  visited: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Favourite', favouriteSchema);