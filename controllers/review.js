const Review = require("../models/review");
const Listing = require("../models/listing");

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
        
        req.flash("success", "Review added successfully!");
        res.redirect(`/listings/${listing._id}`);
    } catch (err) {
        req.flash("error", err.message);
        res.redirect(`/listings/${req.params.id}`);
    }
};

// Delete review
module.exports.deleteReview = async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        
        req.flash("success", "Review deleted successfully!");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect(`/listings/${req.params.id}`);
    }
};