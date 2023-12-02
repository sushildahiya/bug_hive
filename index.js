// Import the express module
const express = require('express');

// Create an instance of the express application
const app = express();

// Set the port number to 8000
const port = 8000;

// Import bodyParser for handling HTTP POST request data
const bodyParser = require('body-parser');

// Import the path module for handling file paths
const path = require('path');

// Import the mongoose configuration for database connection
const db = require('./config/mongoose');

// Import express session for managing user sessions
const session = require('express-session');

// Import express-ejs-layouts for layout support in EJS templates
const expressLayout = require('express-ejs-layouts');

// Import passport for authentication
const passport = require('passport');

// Import the local passport configuration
const passportLocal = require('./config/passport-local');

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory path
app.set('views', path.join(__dirname, 'views'));

// Use expressLayout middleware for layout support
app.use(expressLayout);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(__dirname + '/uploads'));

// Serve static files from the 'assets' directory
app.use(express.static(path.join(__dirname, 'assets')));

// Use bodyParser middleware to parse JSON and URL-encoded data
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Use express-session middleware for managing user sessions
app.use(session({
    name: 'bug_hive',
    secret: 'bughive', // Use a strong, random key for session encryption
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 100) // Set the session cookie's maximum age
    }
}));

// Use passport middleware for authentication
app.use(passport.initialize());
app.use(passport.session());

// Use passport setAuthenticatedUser middleware to set the authenticated user in locals
app.use(passport.setAuthenticatedUser);

// Use routes defined in the './routes' module
app.use('/', require('./routes'));

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
