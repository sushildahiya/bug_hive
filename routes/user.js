// Import the express module to create a Router
const express = require('express');

// Create an instance of the express Router
const router = express.Router();

// Import the user controller module
const userController = require('../controller/userController');

// Import passport for authentication
const passport = require('passport');

// Define routes for user-related functionalities using the userController methods

// Route to render the sign-in page (GET request)
router.get('/sign-in', userController.signIn);

// Route to create a session (POST request) using local authentication strategy
router.post('/create-session', passport.authenticate('local', {
    failureRedirect: '/user/sign-in'
}), userController.createSession);

// Route to handle user sign-up (POST request)
router.post('/sign-up', userController.signUp);

// Route to sign out the user (GET request)
router.get('/sign-out', userController.signOut);

// Export the router for use in other modules
module.exports = router;
