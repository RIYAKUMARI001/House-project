const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },
    booking: {
        type: Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    }
}, { timestamps: true });

reviewSchema.index({ booking: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review; 