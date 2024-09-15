const express = require('express')
const route = express.Router();
const roomController = require('../controllers/roomController')
const authMiddleware = require('../middlewares/authMiddleware')

route.post("/", roomController.createRoom);
route.get("/", roomController.getRooms);
route.delete("/:id", authMiddleware.verifyToken, authMiddleware.AdminMiddleware, roomController.deleteRooms);
route.put('/:id', roomController.updateRoom);

module.exports = route;