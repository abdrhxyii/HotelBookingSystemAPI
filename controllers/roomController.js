const Room = require('../modals/Room');
const Hotel = require("../modals/Hotel")

exports.createRoom = async (req, res) => {
    const { hotelId, roomType, occupancy, beds, childrenAllowed, pricePerNight } = req.body;
  
    try {
      const newRoom = await Room.create({
        hotelId,
        roomType,
        occupancy,
        beds,
        childrenAllowed,
        pricePerNight,
      });
      return res.status(201).json(newRoom);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll({
      include: [
        {
          model: Hotel,
          as: 'hotel',
          attributes: ['id', 'name'] 
        }
      ]
    });

    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ message: "No rooms found" });
    }

    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRooms = async (req, res) => {
  try {
    const id = req.params.id
    const rooms = await Room.findOne({where: {id : id}})
    if(!rooms){
      res.status(404).json({message: "Room Does Not Exist"})
    }
    await Room.destroy({where: {id: id}})
    res.status(204).json({message: "deleted"})
  } catch (error) {
    res.status(500).json({error: error.message })
  }
}

exports.updateRoom = async (req, res) => {
  const { hotelId, roomType, occupancy, beds, childrenAllowed, pricePerNight } = req.body;
  const id = req.params.id;

  try {
    const room = await Room.findOne({ where: { id } });
    
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    await room.update({
      hotelId,
      roomType,
      occupancy,
      beds,
      childrenAllowed,
      pricePerNight,
    });

    return res.status(200).json(room);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
