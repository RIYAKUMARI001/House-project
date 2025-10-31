const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const passport = require("passport");
const { isLoggedIn, isLoggedInAPI } = require("../middleware");

// Wrap async functions to catch errors
const wrapAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

// Register Routes
router.get("/signup", userController.renderSignupForm);
router.post("/signup", wrapAsync(userController.signup));

// Login Routes
router.get("/login", userController.renderLoginForm);
router.post("/login", 
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login"
    }), 
    userController.login
);

// Logout Route
router.get("/logout", userController.logout);

// Profile Routes
router.get("/profile", isLoggedIn, wrapAsync(userController.showProfile));
router.get("/profile/edit", isLoggedIn, wrapAsync(userController.renderEditProfile));
router.put("/profile", isLoggedIn, wrapAsync(userController.updateProfile));

// Test route
router.get("/test-wishlist", (req, res) => {
    res.json({ 
        message: "Route working!", 
        user: req.user ? req.user.username : "Not logged in",
        authenticated: req.isAuthenticated()
    });
});

// Wishlist Routes
router.get("/wishlist", isLoggedIn, wrapAsync(userController.showWishlist));
router.post("/wishlist/:listingId", isLoggedIn, wrapAsync(userController.addToWishlist));
router.delete("/wishlist/:listingId", isLoggedIn, wrapAsync(userController.removeFromWishlist));

module.exports = router;