const Guest = require('./modals/Guest');
const Room = require('./modals/Room');
const Hotel = require('./modals/Hotel');
const Booking = require('./modals/Booking');

Hotel.hasMany(Room, {
    foreignKey: 'hotelId',
    as: 'rooms',
});

Room.belongsTo(Hotel, {
    foreignKey: 'hotelId',
    as: 'hotel',
});

Guest.hasMany(Booking, {
    foreignKey: 'guestId',
    as: 'bookings',
});

Booking.belongsTo(Guest, {
    foreignKey: 'guestId',
    as: 'guest',
});

Hotel.hasMany(Booking, {
    foreignKey: 'hotelId',
    as: 'bookings',
});

Booking.belongsTo(Hotel, {
    foreignKey: 'hotelId',
    as: 'hotel',
});

Room.hasMany(Booking, {
    foreignKey: 'roomId',
    as: 'bookings',
});

Booking.belongsTo(Room, {
    foreignKey: 'roomId',
    as: 'room',
});

module.exports = {
    Guest,
    Room,
    Hotel,
    Booking,
};
