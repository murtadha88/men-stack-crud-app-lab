const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: String,
    company: String,
    model: Number,
    price: Number,
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;