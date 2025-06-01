const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["House", "Apartment", "Villa", "Cottage", "Condo", "Studio", "Cabin", "Penthouse", "Bungalow", "Lodge", "Island", "Castle", "Treehouse"],
        required: true
    },
    images: [{
        url: String,
        filename: String
    }],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    amenities: [{
        type: String,
        enum: ["WiFi", "Kitchen", "Washer", "Dryer", "Air Conditioning", "Heating", 
               "TV", "Pool", "Gym", "Parking", "Elevator", "Indoor Fireplace", 
               "Breakfast", "Workspace", "Pets Allowed"]
    }],
    bedrooms: {
        type: Number,
        required: true,
        min: 1
    },
    bathrooms: {
        type: Number,
        required: true,
        min: 1
    },
    maxGuests: {
        type: Number,
        required: true,
        min: 1
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: "Booking"
    }],
    rating: {
        type: Number,
        default: 0
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Virtual for average rating
listingSchema.virtual('averageRating').get(function() {
    if (this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / this.reviews.length;
});

// Middleware to delete associated reviews when a listing is deleted
listingSchema.post('findOneAndDelete', async function(listing) {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
