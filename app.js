const express = require ("express");
const app = express();  
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");

const MONGO_URL = "mongodb://127.0.0.1:27017/test";

main().then(() => console.log("Connected to database"))
.catch((err) => console.log(err));
async function main() {
 await mongoose.connect(MONGO_URL);   
}
app.get ("/", (req, res) => {
    res.send("Hello World");
})
//Index Route
app.get("/listings", async (req, res) => {
    const allListing= await Listing.find({});
    res.render("listings/index.ejs", {listings: allListing});
    });

//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
    });

//Show Route
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id); 
    res.render("listings/show.ejs", {listing});
    });
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));
    app.use(express.urlencoded({extended: true}));
    app.use(methodOverride("_method"));

//New Route
// app.get("/listings/new", (req, res) => {
//     res.render("listings/new.ejs");
//     });

//Create Route App
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect(`/listings/${newListing._id}`);
})

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id); 
    res.render("listings/edit.ejs", {listing});
})

//Update Route
app.put("/listings/:id", async (req, res) => {
    let {id} = req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing})
   res.redirect(`/listings/${id}`);
})

//DELETE Route
app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

