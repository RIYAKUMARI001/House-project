const User = require("../models/user");

// Render signup form
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup");
};

// Handle signup
module.exports.signup = async (req, res, next) => {
    try {
        const { email, username, password, firstName, lastName } = req.body;
        const user = new User({ email, username, firstName, lastName });
        const registeredUser = await User.register(user, password);
        
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust!");
            res.redirect("/listings");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

// Render login form
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
};

// Handle login
module.exports.login = (req, res) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = req.session.returnTo || "/listings";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

// Handle logout
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Goodbye!");
        res.redirect("/listings");
    });
};

// Show user profile
module.exports.showProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
            .populate({
                path: "bookings",
                populate: {
                    path: "listing"
                }
            })
            .populate({
                path: "reviews",
                populate: {
                    path: "listing"
                }
            });
        res.render("users/profile", { user });
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
};

// Render edit profile form
module.exports.renderEditProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        res.render("users/edit", { user });
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/profile");
    }
};

// Update profile
module.exports.updateProfile = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phoneNumber } = req.body;
        await User.findByIdAndUpdate(req.user._id, {
            firstName,
            lastName,
            email,
            phoneNumber
        });
        req.flash("success", "Profile updated successfully!");
        res.redirect("/profile");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/profile/edit");
    }
};

// Add to wishlist
module.exports.addToWishlist = async (req, res, next) => {
    try {
        const { listingId } = req.params;
        const user = await User.findById(req.user._id);
        
        // Only add if not already in wishlist
        if (!user.wishlist.includes(listingId)) {
            user.wishlist.push(listingId);
            await user.save();
            req.flash("success", "Added to wishlist!");
        } else {
            req.flash("error", "Already in wishlist!");
        }
        
        res.redirect(`/listings/${listingId}`);
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
};

// Get wishlist count
module.exports.getWishlistCount = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({ count: user.wishlist.length });
    } catch (err) {
        res.json({ count: 0 });
    }
};

// Remove from wishlist
module.exports.removeFromWishlist = async (req, res, next) => {
    try {
        const { listingId } = req.params;
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { wishlist: listingId }
        });
        req.flash("success", "Removed from wishlist!");
        res.redirect("/wishlist");
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/wishlist");
    }
};

// Show wishlist
module.exports.showWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).populate("wishlist");
        res.render("users/wishlist", { 
            listings: user.wishlist,
            currentUser: user 
        });
    } catch (err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
};