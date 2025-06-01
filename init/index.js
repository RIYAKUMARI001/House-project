const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const sampleListings = require("./data");
const sampleUsers = require("./users");

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
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    // Delete existing data
    await Listing.deleteMany({});
    await User.deleteMany({});

    // Create demo user
    const demoUser = new User(sampleUsers[0]);
    await demoUser.setPassword("password123"); // Set a default password
    await demoUser.save();
    console.log("Demo user created");

    // Update listings with owner and valid amenities
    const updatedListings = sampleListings.map(listing => ({
      ...listing,
      owner: demoUser._id,
      amenities: listing.amenities.filter(amenity => 
        ["WiFi", "Kitchen", "Washer", "Dryer", "Air Conditioning", "Heating", 
         "TV", "Pool", "Gym", "Parking", "Elevator", "Indoor Fireplace", 
         "Breakfast", "Workspace", "Pets Allowed"].includes(amenity)
      )
    }));

    // Insert listings
    await Listing.insertMany(updatedListings);
    console.log("Sample listings added");

  } catch (err) {
    console.error("Error init database:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

// Run the main function
main().then(initDB);
