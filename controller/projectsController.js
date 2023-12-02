// Import the Project model and the 'path' module for handling file paths
const Project = require('../models/project');
const path = require('path');

// Route handler for creating a new project
module.exports.createProject = async (req, res) => {
    try {
        // Use the 'uploadAvatar' function from the Project model to handle file uploads
        await Project.uploadAvatar(req, res, function (err) {
            // Handle Multer (file upload) errors
            if (err) {
                console.log("Multer error: ", err);
                return res.status(500).send("Error uploading avatar");
            }

            // If a file is successfully uploaded, create a new project
            if (req.file) {
                // Prepare project data from the request parameters and uploaded file
                let project = {
                    name: req.body.name,
                    description: req.body.description,
                    project_avatar: path.join(Project.avatarPath, req.file.filename),
                    author: req.user.username
                };

                // Create the new project in the database
                const newProject = Project.create(project);

                // Redirect back to the previous page after project creation
                return res.redirect('back');
            }
        });
    } catch (err) {
        // Handle general errors during project creation
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

// Route handler for deleting a project
module.exports.deleteProject = async (req, res) => {
    // Delete the project with the provided ID from the database
    await Project.deleteOne({ _id: req.params.id });

    // Redirect back to the previous page after project deletion
    res.redirect('back');
};
