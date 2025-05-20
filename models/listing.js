const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  image: {
    filename: String,
    url: String
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
