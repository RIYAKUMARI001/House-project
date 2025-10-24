const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/review");
const { isLoggedIn } = require("../middleware");
const { validateReview } = require("../validation");

// Create Review
router.post("/", isLoggedIn, validateReview, reviewController.createReview);

// Delete Review
router.delete("/:reviewId", isLoggedIn, reviewController.deleteReview);

module.exports = router;