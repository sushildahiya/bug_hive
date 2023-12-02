// Import necessary modules: mongoose for MongoDB, multer for file uploads, and path for handling file paths
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// Define the path where screenshots will be stored
const SCREENSHOT_PATH = path.join('/uploads/issues/avatars');

// Define the schema for the 'Issue' model
const issueSchema = new mongoose.Schema({
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Open", "Closed", "RCA", "Monitoring"],
        required: true,
        default: false
    },
    priority: {
        type: String,
        enum: ["P0", "P1", "P3", "P4"],
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    labels: [
        { type: String }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    screenshot: {
        type: String,
        required: false
    },
    assigned_to: {
        type: String,
        required: true
    }
});

// Multer storage configuration for avatar uploads
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination path for storing screenshots
        cb(null, path.join(__dirname, '..', SCREENSHOT_PATH));
    },
    filename: function (req, file, cb) {
        // Set the filename for the uploaded screenshot
        cb(null, file.fieldname + '-' + Date.now());
    }
});

// Define a static method for the 'Issue' model to handle screenshot uploads
issueSchema.statics.uploadScreenShot = multer({ storage: storage }).single('screenshot');

// Define the path where screenshots are stored
issueSchema.statics.screenshotPath = SCREENSHOT_PATH;

// Create the 'Issue' model using the defined schema
const Issue = mongoose.model('Issue', issueSchema);

// Export the 'Issue' model for use in other modules
module.exports = Issue;
