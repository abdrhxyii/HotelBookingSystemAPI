const express = require('express')
const route = express.Router();
const bookingController = require('../controllers/bookingController')

route.post("/", bookingController.createBooking);
module.exports = route;