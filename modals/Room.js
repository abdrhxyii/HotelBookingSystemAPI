const Sequelize = require('sequelize')
const dbconfig = require('../configs/dbConfig')
const Hotel = require('./Hotel')

const Room = dbconfig.define("Rooms", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    roomType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    occupancy: {
        type: Sequelize.INTEGER,
        allowNull: false, 
    },
    beds: {
        type: Sequelize.INTEGER,
        allowNull: false, 
    },
    childrenAllowed: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    pricePerNight: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    hotelId: {
        type: Sequelize.INTEGER,
        references: {
            model: Hotel,
            key: 'id'
        }
    }
})

module.exports = Room;