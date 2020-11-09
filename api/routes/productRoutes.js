//use express Router
// // to handle my product routes

const express = require("express");
const route = express.Router();
const products = require("../data");

// Create a "GET" route for the products

route.get("/", (req, res) => {
  res.json(products);
});

module.exports = route;
