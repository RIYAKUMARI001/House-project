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
        return next(new Error('Check-out date must be after check-in date'));
    }
    next();
});

bookingSchema.pre('save', async function(next) {
    // Skip overlap validation if:
    // 1. Not a new booking and dates haven't changed
    // 2. Booking is being cancelled
    if (!this.isNew && !this.isModified('checkIn') && !this.isModified('checkOut')) {
        return next();
    }
    
    // Skip validation if booking is cancelled or completed
    if (this.status === 'cancelled' || this.status === 'completed') {
        return next();
    }
    
    try {
        const overlappingBooking = await this.constructor.findOne({
            _id: { $ne: this._id }, // Exclude current booking
            listing: this.listing,
            status: { $in: ["pending", "confirmed"] },
            $and: [
                {
                    checkIn: { $lt: this.checkOut }
                },
                {
                    checkOut: { $gt: this.checkIn }
                }
            ]
        });

        if (overlappingBooking) {
            return next(new Error('This listing is already booked for these dates'));
        }
        next();
    } catch (err) {
        next(err);
    }
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking; 