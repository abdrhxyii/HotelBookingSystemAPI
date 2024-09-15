const Sequelize = require('sequelize')
const dbconfig = require('../configs/dbConfig')

const Guest = dbconfig.define("Guests", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
    },
    role: {
        type: Sequelize.ENUM('guest', 'admin'),
        allowNull: true,
        defaultValue: 'guest'
    },
})

module.exports = Guest;