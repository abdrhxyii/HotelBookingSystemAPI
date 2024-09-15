const express = require('express')
const route = express.Router();
const hotelController = require('../controllers/hotelController')
const authMiddleware = require('../middlewares/authMiddleware')

route.post("/", hotelController.createHotel);
route.get('/search', hotelController.searchHotels);
route.get("/locations", hotelController.getLocationsBySearch);
route.get("/all", hotelController.getAllHotels);
route.delete( '/:id', authMiddleware.verifyToken, authMiddleware.AdminMiddleware, hotelController.deleteHotels);
route.put('/:id', hotelController.updateHotel);

module.exports = route;