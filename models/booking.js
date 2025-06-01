const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },
    guest: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    guests: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "completed"],
        default: "pending"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending"
    },
    paymentId: String,
    specialRequests: String
}, { timestamps: true });

bookingSchema.pre('save', function(next) {
    if (this.checkOut <= this.checkIn) {
        next(new Error('Check-out date must be after check-in date'));
    }
    next();
});

bookingSchema.pre('save', async function(next) {
    const overlappingBooking = await this.constructor.findOne({
        listing: this.listing,
        status: { $in: ["pending", "confirmed"] },
        $or: [
            {
                checkIn: { $lte: this.checkOut },
                checkOut: { $gte: this.checkIn }
            }
        ]
    });

    if (overlappingBooking) {
        next(new Error('This listing is already booked for these dates'));
    }
    next();
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking; 