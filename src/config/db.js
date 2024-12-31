const mongoose = require('mongoose');

const connectDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log('Blog service connected to MongoDB successfully!!');
    } catch(err) {
        console.log('MongoDB connection error', err.message);
        process.exit(1);
    }
}

module.exports = connectDB;