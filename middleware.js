const Listing = require("./models/listing");
const Booking = require("./models/booking");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in to access this page!");
        return res.redirect("/login");
    }
    next();
};

module.exports.isAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }
        if (!listing.owner._id.equals(req.user._id)) {
            req.flash("error", "You don't have permission to do that!");
            return res.redirect(`/listings/${id}`);
        }
        next();
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
};

module.exports.isBookingAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
        if (!booking) {
            req.flash("error", "Booking not found!");
            return res.redirect("/bookings");
        }
        if (!booking.guest._id.equals(req.user._id)) {
            req.flash("error", "You don't have permission to do that!");
            return res.redirect(`/bookings/${id}`);
        }
        next();
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/bookings");
    }
};

module.exports.isListingOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }
        if (!listing.owner._id.equals(req.user._id)) {
            req.flash("error", "You don't have permission to do that!");
            return res.redirect(`/listings/${id}`);
        }
        next();
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
}; 