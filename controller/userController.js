// Import the User model and the 'path' module for handling file paths
const User = require('../models/user');
const path = require('path');

// Route handler for rendering the sign-in page
module.exports.signIn = (req, res) => {
    res.render('sign-in', { layout: false });
};

// Route handler for creating a new session (user sign-in)
module.exports.createSession = function (req, res) {
    // Redirect to the home page after successful sign-in
    return res.redirect('/');
};

// Route handler for rendering the sign-up page and creating a new user
module.exports.signUp = async (req, res) => {
    // Fetch existing users from the database
    const existingUsers = await User.find({});

    try {
        // Use the 'uploadAvatar' function from the User model to handle file uploads
        await User.uploadAvatar(req, res, function (err) {
            // Handle Multer (file upload) errors
            if (err) {
                console.log("Multer error: ", err);
                return res.status(500).send("Error uploading avatar");
            }

            // If a file is successfully uploaded, create a new user
            if (req.file) {
                // Prepare user data from the request parameters and uploaded file
                let user = {
                    username: req.body.username,
                    email: req.body.email,
                    contact_no: req.body.contact_no,
                    password: req.body.password,
                };

                // If no existing users, set the new user as an admin
                if (existingUsers.length == 0) {
                    user.is_admin = true;
                }

                // Set the avatar path for the new user
                user.avatar = path.join(User.avatarPath, req.file.filename);

                // Create the new user in the database
                const newUser = User.create(user);

                // Redirect back to the previous page after user creation
                return res.redirect('back');
            }
        });
    } catch (err) {
        // Handle general errors during user creation
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

// Route handler for signing out a user
module.exports.signOut = function (req, res, done) {
    // Use the 'logout' function provided by Passport to sign out the user
    return req.logout((err) => {
        // Handle errors during sign-out
        if (err) {
            return done(err);
        }
        // Redirect to the sign-in page after successful sign-out
        return res.redirect('/user/sign-in');
    });
};
