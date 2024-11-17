const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URL ;  // Make sure the database name is included here

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
