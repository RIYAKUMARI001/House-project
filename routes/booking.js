const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking");
const { isLoggedIn } = require("../middleware");
const { validateBooking } = require("../validation");

// Create a new booking
router.post("/", isLoggedIn, validateBooking, bookingController.createBooking);

// Show all bookings for the current user
router.get("/", isLoggedIn, bookingController.userBookings);

// Cancel booking (for guests) - MUST be before /:id route
router.put("/:id/cancel", isLoggedIn, bookingController.cancelBooking);

// Update booking status (for hosts)
router.put("/:id/status", isLoggedIn, bookingController.updateBookingStatus);

// Show a specific booking
router.get("/:id", isLoggedIn, bookingController.showBooking);

module.exports = router;