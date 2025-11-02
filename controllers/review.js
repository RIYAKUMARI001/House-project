const Review = require("../models/review");
const Listing = require("../models/listing");
const User = require("../models/user");

// Create review
module.exports.createReview = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        const newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        newReview.listing = listing._id;
        
        listing.reviews.push(newReview);
        
        await newReview.save();
        await listing.save();
        
        // Add review to user's reviews array
        const user = await User.findById(req.user._id);
        user.reviews.push(newReview._id);
        await user.save();
        
        // Check if request is AJAX (expects JSON response)
        if (req.headers['content-type'] === 'application/json' || req.xhr) {
            res.json({ success: true, message: "Review added successfully!" });
        } else {
            req.flash("success", "Review added successfully!");
            res.redirect(`/listings/${listing._id}`);
        }
    } catch (err) {
        // Check if request is AJAX (expects JSON response)
        if (req.headers['content-type'] === 'application/json' || req.xhr) {
            res.json({ success: false, message: err.message });
        } else {
            req.flash("error", err.message);
            res.redirect(`/listings/${req.params.id}`);
        }
    }
};

// Delete review
module.exports.deleteReview = async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        
        // Also remove from user's reviews array
        await User.findByIdAndUpdate(req.user._id, { $pull: { reviews: reviewId } });
        
        req.flash("success", "Review deleted successfully!");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect(`/listings/${req.params.id}`);
    }
};