const Listing = require("../models/listing");
const User = require("../models/user");

// Show all listings
module.exports.index = async (req, res) => {
    try {
        const { category, location, minPrice, maxPrice, search, guests } = req.query;
        let filter = {};
        
        // Search functionality
        if (search && search.trim()) {
            const searchTerm = search.trim();
            filter.$or = [
                { title: new RegExp(searchTerm, 'i') },
                { description: new RegExp(searchTerm, 'i') },
                { location: new RegExp(searchTerm, 'i') },
                { country: new RegExp(searchTerm, 'i') }
            ];
        }
        
        if (category && category !== 'all') filter.category = category;
        if (location) filter.location = new RegExp(location, 'i');
        if (guests) filter.maxGuests = { $gte: parseInt(guests) };
        
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseInt(minPrice);
            if (maxPrice) filter.price.$lte = parseInt(maxPrice);
        }

        const listings = await Listing.find(filter).populate("owner");
        
        // Get unique categories for filter dropdown
        const categories = await Listing.distinct('category');
        
        // Get current user with wishlist if logged in
        let currentUserWithWishlist = null;
        if (req.user) {
            currentUserWithWishlist = await User.findById(req.user._id);
        }
        
        res.render("listings/index", { 
            listings, 
            categories: categories || [],
            currentFilters: req.query || {},
            currentUser: currentUserWithWishlist || req.user
        });
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/");
    }
};

// Show form to create new listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

// Create new listing
module.exports.createListing = async (req, res) => {
    try {
        const listing = new Listing(req.body.listing);
        listing.owner = req.user._id;
        await listing.save();
        req.flash("success", "New listing created successfully!");
        res.redirect(`/listings/${listing._id}`);
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/listings/new");
    }
};

// Show specific listing
module.exports.showListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)
            .populate({
                path: "reviews",
                populate: {
                    path: "author"
                }
            })
            .populate("owner");
        
        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }
        
        // Get current user with wishlist if logged in
        let currentUserWithWishlist = null;
        if (req.user) {
            currentUserWithWishlist = await User.findById(req.user._id);
        }
        
        res.render("listings/show", { 
            listing,
            currentUser: currentUserWithWishlist || req.user
        });
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
};

// Show form to edit listing
module.exports.renderEditForm = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }
        res.render("listings/edit", { listing });
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
};

// Update listing
module.exports.updateListing = async (req, res) => {
    try {
        const { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        req.flash("success", "Listing updated successfully!");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        req.flash("error", err.message);
        res.redirect(`/listings/${req.params.id}/edit`);
    }
};

// Delete listing
module.exports.deleteListing = async (req, res) => {
    try {
        const { id } = req.params;
        await Listing.findByIdAndDelete(id);
        req.flash("success", "Listing deleted successfully!");
        res.redirect("/listings");
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
};