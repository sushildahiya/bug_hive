// Import necessary modules: express for web application framework and passport for authentication
const express = require('express');
const passport = require('../config/passport-local');

// Create an instance of the express Router
const router = express.Router();

// Import the home controller module
const homeController = require('../controller/homeController');

// Define routes for various functionalities using the homeController methods

// Route for the home/dashboard page
router.get('/', passport.checkAuthentication, homeController.dashboard);

// Routes for project-related pages
router.get('/projects/:id', passport.checkAuthentication, homeController.projects);
router.get('/projects', passport.checkAuthentication, homeController.projects);

// Routes for issue-related pages
router.get('/issues/:id', passport.checkAuthentication, homeController.issues);
router.get('/issues', passport.checkAuthentication, homeController.issues);

// Use routes defined in separate modules for user, projects, and issues
router.use('/user', require('./user'));
router.use('/projects', require('./projects'));
router.use('/issue', require('./issue'));

// Export the router for use in other modules
module.exports = router;
