const Sequelize = require("sequelize");
const dbconfig = require("../configs/dbConfig");
const Room = require('./Room')
const Hotel = require('./Hotel')
const Guest = require('./Guest')

const Booking = dbconfig.define("Bookings", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    checkInDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    checkOutDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    totalGuests: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    totalChildren: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    numberOfRooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    roomId: {
        type: Sequelize.INTEGER,
        references: {
            model: Room,
            key: 'id',
        },
    },
    hotelId: {
        type: Sequelize.INTEGER,
        references: {
            model: Hotel,
            key: 'id',
        },
    },
    guestId: {
        type: Sequelize.INTEGER,
        references: {
            model: Guest,
            key: 'id',
        },
    }
})

module.exports = Booking;