const Booking = require('../modals/Booking');

exports.createBooking = async (req, res) => {
  const { roomId, hotelId, checkInDate, checkOutDate, totalGuests, totalChildren, numberOfRooms } = req.body;

  try {
    const newBooking = await Booking.create({
      roomId,
      hotelId,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalChildren,
      numberOfRooms,
    });
    return res.status(201).json(newBooking);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
