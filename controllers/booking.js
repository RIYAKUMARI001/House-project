const Booking = require("../models/booking");
const Listing = require("../models/listing");
const User = require("../models/user");

// Create a new booking
module.exports.createBooking = async (req, res) => {
    try {
        const { listing, checkIn, checkOut, guests, totalPrice, specialRequests } = req.body;
        
        // Create the booking
        const booking = new Booking({
            listing,
            guest: req.user._id,
            checkIn,
            checkOut,
            guests,
            totalPrice,
            specialRequests
        });

        // Save the booking
        await booking.save();

        // Update the listing's bookings array
        await Listing.findByIdAndUpdate(listing, {
            $push: { bookings: booking._id }
        });

        // Update the user's bookings array
        await User.findByIdAndUpdate(req.user._id, {
            $push: { bookings: booking._id }
        });

        req.flash("success", "Booking created successfully!");
        res.redirect(`/bookings/${booking._id}`);
    } catch (err) {
        req.flash("error", err.message);
        res.redirect(`/listings/${req.body.listing}`);
    }
};

// Show booking details
module.exports.showBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate({
                path: "listing",
                populate: {
                    path: "owner"
                }
            })
            .populate("guest");

        if (!booking) {
            req.flash("error", "Booking not found!");
            return res.redirect("/listings");
        }

        // Check if the user is authorized to view this booking
        if (!booking.guest._id.equals(req.user._id) && !booking.listing.owner._id.equals(req.user._id)) {
            req.flash("error", "You don't have permission to view this booking!");
            return res.redirect("/listings");
        }

        res.render("bookings/show", { booking });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/listings");
    }
};

// Show user's bookings
module.exports.userBookings = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate({
                path: "bookings",
                populate: {
                    path: "listing",
                    select: "title images price location"
                }
            });

        res.render("bookings/index", { bookings: user.bookings });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/listings");
    }
};

// Update booking status (for hosts)
module.exports.updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const booking = await Booking.findById(id)
            .populate("listing");

        if (!booking) {
            req.flash("error", "Booking not found!");
            return res.redirect("/listings");
        }

        // Check if the user is the listing owner
        if (!booking.listing.owner._id.equals(req.user._id)) {
            req.flash("error", "You don't have permission to update this booking!");
            return res.redirect("/listings");
        }

        booking.status = status;
        await booking.save();

        req.flash("success", "Booking status updated successfully!");
        res.redirect(`/bookings/${booking._id}`);
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/listings");
    }
};

// Cancel booking (for guests)
module.exports.cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);

        if (!booking) {
            req.flash("error", "Booking not found!");
            return res.redirect("/listings");
        }

        // Check if the user is the guest
        if (!booking.guest._id.equals(req.user._id)) {
            req.flash("error", "You don't have permission to cancel this booking!");
            return res.redirect("/listings");
        }

        // Only allow cancellation if the booking is pending or confirmed
        if (!["pending", "confirmed"].includes(booking.status)) {
            req.flash("error", "This booking cannot be cancelled!");
            return res.redirect(`/bookings/${booking._id}`);
        }

        booking.status = "cancelled";
        await booking.save();

        req.flash("success", "Booking cancelled successfully!");
        res.redirect(`/bookings/${booking._id}`);
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/listings");
    }
}; 