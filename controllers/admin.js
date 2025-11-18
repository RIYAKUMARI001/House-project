const Listing = require("../models/listing");
const User = require("../models/user");
const Review = require("../models/review");
const Booking = require("../models/booking");

// Admin Dashboard
module.exports.dashboard = async (req, res) => {
    try {
        // Get counts with fallback to 0
        const totalListings = await Listing.countDocuments() || 0;
        const totalUsers = await User.countDocuments() || 0;
        
        // Handle models that might not exist
        let totalReviews = 0;
        let totalBookings = 0;
        
        try {
            totalReviews = await Review.countDocuments() || 0;
        } catch (err) {
            console.log("Review model not accessible:", err.message);
        }
        
        try {
            totalBookings = await Booking.countDocuments() || 0;
        } catch (err) {
            console.log("Booking model not accessible:", err.message);
        }
        
        const recentListings = await Listing.find()
            .populate("owner")
            .sort({ createdAt: -1 })
            .limit(5) || [];
            
        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(5) || [];

        res.render("admin/dashboard", {
            totalListings,
            totalUsers,
            totalReviews,
            totalBookings,
            recentListings,
            recentUsers
        });
    } catch (err) {
        console.error("Admin dashboard error:", err);
        req.flash("error", "Dashboard loading failed: " + err.message);
        res.redirect("/");
    }
};

// Show all listings for admin
module.exports.listingsIndex = async (req, res) => {
    try {
        const { search, category, status } = req.query;
        let filter = {};
        
        if (search && search.trim()) {
            const searchTerm = search.trim();
            filter.$or = [
                { title: new RegExp(searchTerm, 'i') },
                { location: new RegExp(searchTerm, 'i') },
                { country: new RegExp(searchTerm, 'i') }
            ];
        }
        
        if (category && category !== 'all') filter.category = category;
        if (status === 'available') filter.isAvailable = true;
        if (status === 'unavailable') filter.isAvailable = false;

        const listings = await Listing.find(filter)
            .populate("owner")
            .sort({ createdAt: -1 });
            
        const categories = await Listing.distinct('category');
        
        res.render("admin/listings", { 
            listings, 
            categories: categories || [],
            currentFilters: req.query || {}
        });
    } catch (err) {
        console.error("Listings route error:", err);
        req.flash("error", "Something went wrong: " + err.message);
        res.redirect("/admin");
    }
};

// Show form to create new listing (admin)
module.exports.renderNewForm = (req, res) => {
    res.render("admin/new-listing");
};

// Create new listing (admin)
module.exports.createListing = async (req, res) => {
    try {
        const listingData = req.body.listing;
        
        // Handle geometry coordinates
        if (listingData.geometry && listingData.geometry.coordinates) {
            listingData.geometry = {
                type: "Point",
                coordinates: [
                    parseFloat(listingData.geometry.coordinates[0]) || 77.2090,
                    parseFloat(listingData.geometry.coordinates[1]) || 28.6139
                ]
            };
        } else {
            listingData.geometry = {
                type: "Point",
                coordinates: [77.2090, 28.6139]
            };
        }
        
        // Handle amenities array
        if (listingData.amenities && !Array.isArray(listingData.amenities)) {
            listingData.amenities = [listingData.amenities];
        }
        
        // Handle images array
        if (listingData.images && listingData.images[0] && listingData.images[0].url) {
            listingData.images = [{
                url: listingData.images[0].url,
                filename: 'admin_upload'
            }];
        } else {
            // Remove images field if empty
            delete listingData.images;
        }
        
        // Handle boolean fields
        listingData.isAvailable = listingData.isAvailable === 'true' || listingData.isAvailable === true;
        
        const listing = new Listing(listingData);
        listing.owner = req.user._id;
        
        await listing.save();
        
        req.flash("success", "New listing created successfully!");
        res.redirect("/admin/listings");
    } catch (err) {
        console.error("Admin create listing error:", err);
        req.flash("error", "Error creating listing: " + err.message);
        res.redirect("/admin/listings/new");
    }
};

// Show form to edit listing (admin)
module.exports.renderEditForm = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate("owner");
        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/admin/listings");
        }
        res.render("admin/edit-listing", { listing });
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/admin/listings");
    }
};

// Update listing (admin)
module.exports.updateListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listingData = req.body.listing;
        
        // Handle geometry coordinates
        if (listingData.geometry && listingData.geometry.coordinates) {
            listingData.geometry = {
                type: "Point",
                coordinates: [
                    parseFloat(listingData.geometry.coordinates[0]) || 77.2090,
                    parseFloat(listingData.geometry.coordinates[1]) || 28.6139
                ]
            };
        }
        
        // Handle amenities array
        if (listingData.amenities && !Array.isArray(listingData.amenities)) {
            listingData.amenities = [listingData.amenities];
        }
        
        // Handle images array
        if (listingData.images && listingData.images[0] && listingData.images[0].url) {
            listingData.images = [{
                url: listingData.images[0].url,
                filename: 'admin_upload'
            }];
        } else if (listingData.images && listingData.images[0] && !listingData.images[0].url) {
            // If image field is empty, don't update images
            delete listingData.images;
        }
        
        // Handle boolean fields
        listingData.isAvailable = listingData.isAvailable === 'true' || listingData.isAvailable === true;
        
        await Listing.findByIdAndUpdate(id, listingData);
        req.flash("success", "Listing updated successfully!");
        res.redirect("/admin/listings");
    } catch (err) {
        console.error("Admin update listing error:", err);
        req.flash("error", "Error updating listing: " + err.message);
        res.redirect(`/admin/listings/${req.params.id}/edit`);
    }
};

// Delete listing (admin)
module.exports.deleteListing = async (req, res) => {
    try {
        const { id } = req.params;
        await Listing.findByIdAndDelete(id);
        req.flash("success", "Listing deleted successfully!");
        res.redirect("/admin/listings");
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/admin/listings");
    }
};

// Toggle listing availability
module.exports.toggleAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/admin/listings");
        }
        
        listing.isAvailable = !listing.isAvailable;
        await listing.save();
        
        const status = listing.isAvailable ? "available" : "unavailable";
        req.flash("success", `Listing marked as ${status}!`);
        res.redirect("/admin/listings");
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/admin/listings");
    }
};

// Show all reviews for admin
module.exports.reviewsIndex = async (req, res) => {
    try {
        const { search } = req.query;
        let filter = {};
        
        const reviews = await Review.find(filter)
            .populate("author")
            .populate("listing")
            .sort({ createdAt: -1 });
        
        res.render("admin/reviews", { 
            reviews,
            currentFilters: req.query || {}
        });
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/admin");
    }
};

// Delete review (admin)
module.exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        await Review.findByIdAndDelete(id);
        req.flash("success", "Review deleted successfully!");
        res.redirect("/admin/reviews");
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/admin/reviews");
    }
};

// Show all users for admin
module.exports.usersIndex = async (req, res) => {
    try {
        const { search, role } = req.query;
        let filter = {};
        
        if (search && search.trim()) {
            const searchTerm = search.trim();
            filter.$or = [
                { username: new RegExp(searchTerm, 'i') },
                { email: new RegExp(searchTerm, 'i') },
                { firstName: new RegExp(searchTerm, 'i') },
                { lastName: new RegExp(searchTerm, 'i') }
            ];
        }
        
        if (role === 'admin') filter.isAdmin = true;
        if (role === 'user') filter.isAdmin = false;

        const users = await User.find(filter).sort({ createdAt: -1 });
        
        res.render("admin/users", { 
            users,
            currentFilters: req.query || {}
        });
    } catch (err) {
        console.error("Users route error:", err);
        req.flash("error", "Something went wrong: " + err.message);
        res.redirect("/admin");
    }
};

// Toggle user admin status
module.exports.toggleAdminStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            req.flash("error", "User not found!");
            return res.redirect("/admin/users");
        }
        
        user.isAdmin = !user.isAdmin;
        await user.save();
        
        const status = user.isAdmin ? "admin" : "regular user";
        req.flash("success", `User ${user.username} is now a ${status}!`);
        res.redirect("/admin/users");
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/admin/users");
    }
};