const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const { isLoggedIn, isAdmin } = require("../middleware");

// Admin Dashboard
router.get("/", isLoggedIn, isAdmin, adminController.dashboard);

// Test route for debugging
router.get("/test", isLoggedIn, isAdmin, (req, res) => {
    res.send(`
        <h1>Admin Test Route Working!</h1>
        <p>User: ${req.user.username}</p>
        <p>Is Admin: ${req.user.isAdmin}</p>
        <a href="/admin">Go to Dashboard</a>
    `);
});

// Listings Management
router.get("/listings", isLoggedIn, isAdmin, adminController.listingsIndex);
router.get("/listings/new", isLoggedIn, isAdmin, adminController.renderNewForm);
router.post("/listings", isLoggedIn, isAdmin, adminController.createListing);
router.get("/listings/:id/edit", isLoggedIn, isAdmin, adminController.renderEditForm);
router.put("/listings/:id", isLoggedIn, isAdmin, adminController.updateListing);
router.delete("/listings/:id", isLoggedIn, isAdmin, adminController.deleteListing);
router.patch("/listings/:id/toggle", isLoggedIn, isAdmin, adminController.toggleAvailability);

// Reviews Management
router.get("/reviews", isLoggedIn, isAdmin, adminController.reviewsIndex);
router.delete("/reviews/:id", isLoggedIn, isAdmin, adminController.deleteReview);

// Users Management
router.get("/users", isLoggedIn, isAdmin, adminController.usersIndex);
router.patch("/users/:id/toggle-admin", isLoggedIn, isAdmin, adminController.toggleAdminStatus);

module.exports = router;