const mongoose = require('mongoose');
require('dotenv').config();
// console.log('----------MONGO DB-URL------', process.env.MONGODB_URL)

const uri = 'mongodb://localhost:27017/spotify_db';  // Make sure the database name is included here
console.log('----------ACCESS DB------', uri)
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
