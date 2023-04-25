// Load required modules
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Create an express app
const app = express();

// Define path for express config
const publicDirect = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialslPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialslPath);

// Setup static directory to serve
app.use(express.static(publicDirect));

// Define route for the homepage
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Leonardo Cavalcanti",
    });
});

// Define route for the About page
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Leonardo Cavalcanti",
    });
});

// Define route for the Help page
app.get("/help", (req, res) => {
    res.render("help", {
        helpMessage: "This is the help page",
        title: "Help",
        name: "Leonardo Cavlacanti",
    });
});

// Define route for the Weather API
app.get("/weather", (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: "You must provide an address",
        });
    }

    // Call geocode function to get location information
    geocode(address, (error, { location, latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error });
        }

        // Call forecast function to get weather information
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address,
            });
        });
    });
});

// Define route for the Products API
app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }

    res.send({
        products: [],
    });
});

// Define route for handling Help 404 errors
app.get("/help/*", (req, res) => {
    res.render("404", {
        name: "Leonardo Cavalcanti",
        error: "Help article not found",
    });
});

// Define route for handling general 404 errors
app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Leonardo Cavalcanti",
        error: "Page not found",
    });
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
