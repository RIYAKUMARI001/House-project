const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    profileImage: {
        url: String,
        filename: String
    },
    phoneNumber: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: "Listing"
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: "Booking"
    }]
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
module.exports = User; 