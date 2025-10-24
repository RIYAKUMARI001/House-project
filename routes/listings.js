const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listing");
const { isLoggedIn, isAuthor } = require("../middleware");
const { validateListing } = require("../validation");

// Index Route - Show all listings
router.get("/", listingController.index);

// New Route - Show form to create new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Create Route - Create new listing
router.post("/", isLoggedIn, validateListing, listingController.createListing);

// Show Route - Show specific listing
router.get("/:id", listingController.showListing);

// Edit Route - Show form to edit listing
router.get("/:id/edit", isLoggedIn, isAuthor, listingController.renderEditForm);

// Update Route - Update listing
router.put("/:id", isLoggedIn, isAuthor, validateListing, listingController.updateListing);

// Delete Route - Delete listing
router.delete("/:id", isLoggedIn, isAuthor, listingController.deleteListing);

module.exports = router;