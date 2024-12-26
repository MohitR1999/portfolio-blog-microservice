require('dotenv').config();

const express = require('express');

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Blog service up and running!!!");
})

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Blog service now running on port: ${PORT}`);
})