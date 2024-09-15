const Sequelize = require('sequelize')
const dbconfig = require('../configs/dbConfig')

const Hotel = dbconfig.define("Hotels", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
    },
    starRating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
    },
    amenities: {
        type: Sequelize.JSON, 
        allowNull: true,
    },
    streetAddress: {
        type: Sequelize.STRING,   
        allowNull: false,        
    },
    isCreditCardNeed: {
        type: Sequelize.BOOLEAN,  
        allowNull: false,         
        defaultValue: false,      
    }
})

module.exports = Hotel;