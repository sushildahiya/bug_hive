// Import necessary modules: mongoose for MongoDB, multer for file uploads, and path for handling file paths
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs')
// Define the path where user avatars will be stored
const AVATAR_PATH = path.join('/uploads/users/avatars');

// Define the schema for the 'User' model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    project: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    }],
    contact_no: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    }
});

// Multer storage configuration for avatar uploads
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination path for storing user avatars
        if(!fs.existsSync(path.join(__dirname, '..', AVATAR_PATH))){
            fs.mkdirSync(path.join(__dirname,'..',AVATAR_PATH),{recursive:true})
        }
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        // Set the filename for the uploaded user avatar
        cb(null, file.fieldname + '-' + Date.now());
    }
});

// Define a static function for the 'User' model to handle avatar uploads using Multer
userSchema.statics.uploadAvatar = multer({ storage: storage }).single('avatar');

// Define a static property for the 'User' model to specify the avatar path
userSchema.statics.avatarPath = AVATAR_PATH;

// Create the 'User' model using the defined schema
const User = mongoose.model('User', userSchema);

// Export the 'User' model for use in other modules
module.exports = User;
