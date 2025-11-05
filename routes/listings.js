const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listing");
const { isLoggedIn, isAuthor } = require("../middleware");
const { validateListing } = require("../validation");

// Middleware to block all listing management for regular users
const blockListingManagement = (req, res, next) => {
    req.flash("error", "Listing management is restricted to administrators only");
    return res.redirect("/listings");
};

// Index Route - Show all listings
router.get("/", listingController.index);

// New Route - BLOCKED for all users (admin only via admin panel)
router.get("/new", blockListingManagement);

// Create Route - BLOCKED for all users (admin only via admin panel)
router.post("/", blockListingManagement);

// Show Route - Show specific listing
router.get("/:id", listingController.showListing);

// Edit Route - BLOCKED for all users (admin only via admin panel)
router.get("/:id/edit", blockListingManagement);

// Update Route - BLOCKED for all users (admin only via admin panel)
router.put("/:id", blockListingManagement);

// Delete Route - BLOCKED for all users (admin only via admin panel)
router.delete("/:id", blockListingManagement);

module.exports = router;