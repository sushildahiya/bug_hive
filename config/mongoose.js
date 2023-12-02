// Import the Mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Connect to the MongoDB database located at 'mongodb://0.0.0.0/bug_hive'
mongoose.connect('mongodb://0.0.0.0/bug_hive', {
    useNewUrlParser: true, // Use the new URL parser for MongoDB connection strings
    useUnifiedTopology: true // Use the new Server Discover and Monitoring engine
});

// Get the default connection to the MongoDB database
const db = mongoose.connection;

// Event listener for MongoDB connection errors
db.on('error', function(err) {
    console.log(err.message); // Log the error message if there's an issue connecting to the database
});

// Event listener for successful MongoDB connection
db.once('open', function() {
    console.log("Successfully connected to the database"); // Log success message when the connection is established
});
