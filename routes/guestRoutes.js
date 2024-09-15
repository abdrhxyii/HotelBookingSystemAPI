const express = require('express')
const route = express.Router();
const guestController = require('../controllers/guestController')

route.post("/register", guestController.createUser);
route.post("/login", guestController.loginUest);
module.exports = route;