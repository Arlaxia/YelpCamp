// Import express and create Express app
const express = require("express");
const methodOverride = require('method-override')
const app = express();

// Path module for file system helper methods
const path = require("path");

// Set views directory and view engine for Express
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))

// Connection to the MongoDB through the mongoose module
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to Database");
});

// Import models
const Campground = require("./models/campground");


// Router
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render("campgrounds/index", { campgrounds });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

app.post("/campgrounds", async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect("campgrounds");
});

app.get("/campgrounds/:id", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", { campground });
});

app.get("/campgrounds/:id/edit", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground })
});

app.put("/campgrounds/:id", async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${id}`);
});

app.delete("/campgrounds/:id", async (req, res) => {
    const id = req.params.id;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
});

app.listen(3000, () => {
    console.log("Listening to port 3000");
});