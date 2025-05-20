const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const sampleListings = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/test";

// Function to connect to the DB
async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(" Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

// Function to initialize DB
const initDB = async () => {
  try {
    await Listing.deleteMany({});
    await Listing.insertMany(sampleListings);
    console.log(" Database init with sample listings");
  } catch (err) {
    console.error(" Error init database:", err);
  } finally {
    mongoose.connection.close();
  }
};

// Run the main function
main().then(initDB);
