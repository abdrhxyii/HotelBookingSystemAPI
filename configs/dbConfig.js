const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'hotel_reservation_system',
    'root',
    '123456',
    {
      host: "localhost",
      dialect: 'mysql',
    }
)

sequelize.authenticate();
module.exports = sequelize