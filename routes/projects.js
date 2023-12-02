// Import the express module to create a Router
const express = require('express');

// Create an instance of the express Router
const router = express.Router();

// Import the projects controller module
const projectController = require('../controller/projectsController');

// Define routes for project-related functionalities using the projectController methods

// Route to create a new project (POST request)
router.post('/create-project', projectController.createProject);

// Route to delete a project based on its ID (GET request)
router.get('/delete/:id', projectController.deleteProject);

// Export the router for use in other modules
module.exports = router;
