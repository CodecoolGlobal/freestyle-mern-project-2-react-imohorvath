const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  message: String,
  subscribe: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Contact", ContactSchema);
