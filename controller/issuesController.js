// Import the Issue model and the 'path' module for handling file paths
const Issue = require('../models/issue');
const path = require('path');

// Route handler for creating a new issue
module.exports.createIssue = async (req, res) => {
    try {
        // Use the 'uploadScreenShot' function from the Issue model to handle file uploads
        await Issue.uploadScreenShot(req, res, async function (err) {
            // Handle Multer (file upload) errors
            if (err) {
                console.log("Multer error: ", err);
                return res.status(500).send("Error uploading avatar");
            }

            // If a file is successfully uploaded, create a new issue
            if (req.file) {
                // Prepare issue data from the request parameters and uploaded file
                let issue = {
                    summary: req.body.summary,
                    description: req.body.description,
                    screenshot: path.join(Issue.screenshotPath, req.file.filename),
                    status: "Open",
                    priority: req.body.priority,
                    project: req.body.project,
                    labels: req.body.labels,
                    author: req.user._id,
                    assigned_to: req.body.assignee
                };

                // Create the new issue in the database
                await Issue.create(issue);

                // Redirect back to the previous page after issue creation
                return res.redirect('back');
            }
        });
    } catch (err) {
        // Handle general errors during issue creation
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

// Route handler for updating the status of an existing issue
module.exports.updateStatus = async (req, res) => {
    // Find the issue by ID in the database
    let issue = await Issue.findById(req.params.id);

    // Update the status of the issue with the provided status from the request body
    issue.status = req.body.status;

    // Save the updated issue in the database
    issue.save();

    // Redirect back to the previous page after updating the issue status
    res.redirect('back');
};

// Route handler for filtering issues based on selected labels
module.exports.filterIssues = async (req, res) => {
    let id = null;

    // Extract selected labels from the request body or set to an empty array if not provided
    const selectedLabels = req.body.labels || [];

    // Find issues in the database where the labels match any of the selected labels
    const filteredIssues = await Issue.find({ labels: { $in: selectedLabels } });

    // Render the 'filter' view with the filtered issues
    res.render('filter', { currentPage: 'issues', filteredIssues });
};

// Route handler for searching issues based on provided keywords
module.exports.searchIssues = async (req, res) => {
    // Extract search keywords from the request body or set to an empty string if not provided
    const searchKeywords = req.body.search || '';

    // Create a case-insensitive regular expression for searching issues by summary or description
    const regex = new RegExp(searchKeywords, 'i');

    // Find issues in the database where the summary or description matches the search keywords
    const searchedIssues = await Issue.find({ $or: [{ summary: regex }, { description: regex }] });

    // Render the 'filter' view with the searched issues
    res.render('filter', { currentPage: 'issues', filteredIssues: searchedIssues });
};
