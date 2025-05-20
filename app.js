const express = require ("express");
const app = express();  
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/test";

main().then(() => console.log("Connected to database"))
.catch((err) => console.log(err));
async function main() {
 await mongoose.connect(MONGO_URL);   
}
app.get ("/", (req, res) => {
    res.send("Hello World");
})

app.get("/listings", async (req, res) => {
    const allListing= await Listing.find({});
    res.render("index.ejs", {listings: allListing});
    });
// app.get("/listings", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "test",
//         description: "test",
//         price: 100,
//         image: "https://images.unsplash.com/photo-1746950862855-ccd90286a57c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8RnpvM3p1T0hONnd8fGVufDB8fHx8fA==",
//         location: "test",
//         country: "test"
//     });

//    await sampleListing.save();
//    console.log("sample listing saved");
//    res.send("Listing saved");
// });
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});