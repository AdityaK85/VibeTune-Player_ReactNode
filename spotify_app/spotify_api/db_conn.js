const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/spotify_db';  // Make sure the database name is included here

async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

module.exports = { connect, uri };