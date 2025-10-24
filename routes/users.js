const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const passport = require("passport");

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

// Wishlist Routes
router.get("/wishlist", userController.showWishlist);
router.post("/wishlist/:listingId", userController.addToWishlist);
router.delete("/wishlist/:listingId", userController.removeFromWishlist);

module.exports = router;