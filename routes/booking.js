const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking");
const { isLoggedIn } = require("../middleware");
const { validateBooking } = require("../validation");

// Wrap async functions to catch errors
const wrapAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

// Create a new booking
router.post("/", isLoggedIn, validateBooking, wrapAsync(bookingController.createBooking));

// Show all bookings for the current user
router.get("/", isLoggedIn, wrapAsync(bookingController.userBookings));

// Cancel booking (for guests) - MUST be before /:id route
router.put("/:id/cancel", isLoggedIn, wrapAsync(bookingController.cancelBooking));

// Update booking status (for hosts)
router.put("/:id/status", isLoggedIn, wrapAsync(bookingController.updateBookingStatus));

// Show a specific booking
router.get("/:id", isLoggedIn, wrapAsync(bookingController.showBooking));

module.exports = router;