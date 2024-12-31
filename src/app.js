require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const blogRoutes = require('./routes/blog');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());
app.use(morgan('combined'));

app.use("/api/blogs", blogRoutes);
app.get("/", (req, res) => {
    res.send("Blog service up and running!!!");
})

// connect to database
const MONGO_URL = process.env.MONGODB_URL
if (process.env.NODE_ENV != 'test') {
    connectDB(MONGO_URL);
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Blog service now running on port: ${PORT}`);
})

module.exports = app;