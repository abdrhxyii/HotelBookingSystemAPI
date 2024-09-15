const { Op, Sequelize, attributes } = require('sequelize')
const Hotel = require('../modals/Hotel')
const Room = require('../modals/Room')
const Booking = require('../modals/Booking')

exports.createHotel = async (req, res) => {
      const {
        image,
        name,
        location,
        description,
        starRating,
        amenities,
        streetAddress,
        isCreditCardNeed,
    } = req.body;
  
    try {
      if (!image || !name || !location || !streetAddress || typeof isCreditCardNeed !== 'boolean') {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const newHotel = await Hotel.create({
          image,
          name,
          location,
          description,
          starRating,
          amenities, 
          streetAddress,
          isCreditCardNeed,
      });
      return res.status(201).json(newHotel);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
};

exports.getAllHotels = async (req, res) => {
  try{ 
    let hotels = await Hotel.findAll();
    res.status(200).json(hotels)
  }catch(error){
    res.status(500).json({message: error.message})
  }
}

exports.deleteHotels = async(req, res) => {
  const id = req.params.id
  try{
    const hotels = await Hotel.findOne({where: {id: id}})
    if(!hotels){
      res.status(404).json({message: "Hotel Does not exits"})
    }else{
      await Hotel.destroy({where: {id: id}})
      res.status(204).json({message: "deleted"})
    }
  }catch(err){
    res.status(500).json({message: err.message})
  }
}

exports.getLocationsBySearch = async (req, res) => {
  const search = req.query.search || '';

  try {
    const locations = await Hotel.findAll({
      attributes: ['location'],
      where: {
        location: {
          [Op.like]: `%${search}%`,
        },
      },
      group: ['location'],
    });

    const availableLocations = locations.map(hotel => hotel.location);
    return res.status(200).json(availableLocations);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const locations = await Hotel.findAll({
      attributes: ['location'],
      group: ['location'],
    });

    const availableLocations = locations.map(hotel => hotel.location);
    return res.status(200).json(availableLocations);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.updateHotel = async (req, res) => {
  const { image, name, location, description, starRating, amenities, streetAddress, isCreditCardNeed } = req.body;
  const id = req.params.id;

  try {
    const hotel = await Hotel.findOne({ where: { id } });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    await hotel.update({
      image,
      name,
      location,
      description,
      starRating,
      amenities,
      streetAddress,
      isCreditCardNeed,
    });

    return res.status(200).json(hotel);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.searchHotels = async (req, res) => {
  const { destination, checkInDate, checkOutDate, guests, children, rooms } = req.query;

  if (!destination || !checkInDate || !checkOutDate || !guests || !children || !rooms) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  try {
    const bookedRooms = await Booking.findAll({
      attributes: ['roomId'],
      where: {
        [Op.or]: [
          { checkInDate: { [Op.lt]: checkOutDate } }, 
          { checkOutDate: { [Op.gt]: checkInDate } }, 
        ],
      },
      include: [
        {
          model: Room,
          as: 'room', 
          attributes: ['id'],
        },
      ],
    });

    const bookedRoomIdsArray = bookedRooms.map(booking => booking.room.id);

    const hotels = await Hotel.findAll({
      where: {
        location: destination,
      },
      include: [
        {
          model: Room,
          as: 'rooms', 
          where: {
            id: {
              [Op.notIn]: bookedRoomIdsArray, 
            },
            occupancy: {
              [Op.gte]: guests,
            },
            childrenAllowed: {
              [Op.gte]: children,
            },
          },
          include: [
            {
              model: Booking,
              as: 'bookings', 
              where: {
                [Op.or]: [
                  { checkInDate: { [Op.gt]: checkOutDate } },
                  { checkOutDate: { [Op.lt]: checkInDate } },
                ],
              },
              required: false,
            },
          ],
        },
      ],
    });

    const formattedHotels = hotels.map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      location: hotel.location,
      description: hotel.description,
      starRating: hotel.starRating,
      amenities: hotel.amenities,
      streetAddress: hotel.streetAddress,
      isCreditCardNeed: hotel.isCreditCardNeed,
      image: hotel.image,
      createdAt: hotel.createdAt,
      updatedAt: hotel.updatedAt,
      rooms: hotel.rooms.map(room => ({
        id: room.id,
        roomType: room.roomType,
        occupancy: room.occupancy,
        beds: room.beds,
        childrenAllowed: room.childrenAllowed,
        pricePerNight: room.pricePerNight,
        hotelId: room.hotelId,
        createdAt: room.createdAt,
        updatedAt: room.updatedAt,
        bookings: room.bookings,
      })),
    }));

    return res.status(200).json(formattedHotels);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};