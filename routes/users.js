const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const passport = require("passport");
const { isLoggedIn, isLoggedInAPI } = require("../middleware");

// Register Routes
router.get("/signup", userController.renderSignupForm);
router.post("/signup", userController.signup);

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
router.get("/profile", userController.showProfile);
router.get("/profile/edit", userController.renderEditProfile);
router.put("/profile", userController.updateProfile);

// Test route
router.get("/test-wishlist", (req, res) => {
    res.json({ 
        message: "Route working!", 
        user: req.user ? req.user.username : "Not logged in",
        authenticated: req.isAuthenticated()
    });
});

// Wishlist Routes
router.get("/wishlist", isLoggedIn, userController.showWishlist);
router.post("/wishlist/:listingId", isLoggedIn, userController.addToWishlist);
router.delete("/wishlist/:listingId", isLoggedIn, userController.removeFromWishlist);

module.exports = router;