require("dotenv").config();
require('./config/database.js');

const express = require('express');
const app = express();

const Car = require('./models/car.js');

const morgan = require('morgan');
const { render } = require("ejs");

const methodOverride = require('method-override');

// MIDDLEWARE:
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));


app.get("/", async (req,res) => {
    res.render('index.ejs');
});

app.get("/cars/new", (req,res) => {
    res.render("cars/new.ejs");
});

app.post("/cars", async (req,res) => {
     await Car.create(req.body);
     res.redirect("/cars");
});

app.get("/cars", async (req,res) => {
    const allCars = await Car.find();
    res.render("cars/index.ejs", {cars: allCars});
});
  
app.get("/cars/:carId", async (req,res) => {
    const foundCar = await Car.findById(req.params.carId);
    res.render("cars/show.ejs", {car: foundCar});
});

app.delete("/cars/:carId", async (req, res) => {
    await Car.findByIdAndDelete(req.params.carId);
    res.redirect("/cars")
});

app.get("/cars/:carId/edit", async (req,res) =>{
    const editedCar = await Car.findById(req.params.carId);
    res.render("cars/edit.ejs", {car:editedCar});
});

app.put("/cars/:carId", async (req, res) => {
    await Car.findByIdAndUpdate(req.params.carId, req.body);
    res.redirect(`/cars/${req.params.carId}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});