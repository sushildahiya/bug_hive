// Import necessary modules: mongoose for MongoDB, multer for file uploads, and path for handling file paths
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs')
// Define the path where project avatars will be stored
const PROJECT_AVATAR_PATH = path.join('/uploads/project/avatars');

// Define the schema for the 'Project' model
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    project_avatar: {
        type: String
    }
});

// Multer storage configuration for avatar uploads
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination path for storing project avatars
        if(!fs.existsSync(path.join(__dirname, '..', PROJECT_AVATAR_PATH))){
            fs.mkdirSync(path.join(__dirname,'..',PROJECT_AVATAR_PATH),{recursive:true})
        }
        cb(null, path.join(__dirname, '..', PROJECT_AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        // Set the filename for the uploaded project avatar
        cb(null, file.fieldname + '-' + Date.now());
    }
});

// Define a static function for the 'Project' model to handle avatar uploads using Multer
projectSchema.statics.uploadAvatar = multer({ storage: storage }).single('project_avatar');

// Define a static property for the 'Project' model to specify the avatar path
projectSchema.statics.avatarPath = PROJECT_AVATAR_PATH;

// Create the 'Project' model using the defined schema
const Project = mongoose.model("Project", projectSchema);

// Export the 'Project' model for use in other modules
module.exports = Project;
