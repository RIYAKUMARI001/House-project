const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking");
const { isLoggedIn, isAuthor } = require("../middleware");
const { validateBooking } = require("../validation");

// Create a new booking
router.post("/", isLoggedIn, validateBooking, bookingController.createBooking);

// Show all bookings for the current user
router.get("/", isLoggedIn, bookingController.userBookings);

// Show a specific booking
router.get("/:id", isLoggedIn, bookingController.showBooking);

// Update booking status (for hosts)
router.put("/:id/status", isLoggedIn, bookingController.updateBookingStatus);

// Cancel booking (for guests)
router.put("/:id/cancel", isLoggedIn, bookingController.cancelBooking);

module.exports = router; 