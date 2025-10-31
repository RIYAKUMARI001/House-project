const Joi = require('joi');

// Listing validation schema
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required().min(3).max(100),
        description: Joi.string().required().min(10).max(1000),
        price: Joi.number().required().min(0),
        location: Joi.string().required().min(2).max(100),
        country: Joi.string().required().min(2).max(50),
        category: Joi.string().required().valid(
            "House", "Apartment", "Villa", "Cottage", "Condo", 
            "Studio", "Cabin", "Penthouse", "Bungalow", "Lodge", 
            "Island", "Castle", "Treehouse"
        ),
        bedrooms: Joi.number().required().min(1).max(20),
        bathrooms: Joi.number().required().min(1).max(10),
        maxGuests: Joi.number().required().min(1).max(50),
        amenities: Joi.array().items(Joi.string().valid(
            "WiFi", "Kitchen", "Washer", "Dryer", "Air Conditioning", 
            "Heating", "TV", "Pool", "Gym", "Parking", "Elevator", 
            "Indoor Fireplace", "Breakfast", "Workspace", "Pets Allowed"
        ))
    }).required()
});

// Review validation schema
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required().min(5).max(500)
    }).required()
});

// Booking validation schema
module.exports.bookingSchema = Joi.object({
    listing: Joi.string().required(),
    checkIn: Joi.date().required().min('now'),
    checkOut: Joi.date().required().greater(Joi.ref('checkIn')),
    guests: Joi.number().required().min(1).max(50),
    totalPrice: Joi.number().required().min(0),
    specialRequests: Joi.string().max(500).allow('')
});

// User validation schema
module.exports.userSchema = Joi.object({
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).allow(''),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required()
});

// Validation middleware
module.exports.validateListing = (req, res, next) => {
    const { error } = module.exports.listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        req.flash('error', msg);
        return res.redirect(req.get('referer') || '/listings');
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    const { error } = module.exports.reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        req.flash('error', msg);
        return res.redirect(req.get('referer') || '/listings');
    }
    next();
};

module.exports.validateBooking = (req, res, next) => {
    const { error } = module.exports.bookingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        req.flash('error', msg);
        return res.redirect(req.get('referer') || '/listings');
    }
    next();
};