const mongoose = require('mongoose');

const connectDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB connected successfully!!');
    } catch(err) {
        console.log('MongoDB connection error', err.message);
        process.exit(1);
    }
}

module.exports = connectDB;