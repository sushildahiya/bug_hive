// Import the issues controller module
const issueController = require('../controller/issuesController');

// Import express and create an instance of the express Router
const express = require('express');
const router = express.Router();

// Define routes for issue-related functionalities using the issueController methods

// Route to create a new issue
router.post('/create-issue', issueController.createIssue);

// Route to update the status of a specific issue
router.post('/update/:id', issueController.updateStatus);

// Route to filter issues based on labels
router.post('/filter', issueController.filterIssues);

// Route to search for issues based on keywords
router.post('/search', issueController.searchIssues);

// Export the router for use in other modules
module.exports = router;
