const express = require("express")
const dbconfig = require("./configs/dbConfig")
const cors = require('cors')

const GuestRoutes = require("./routes/guestRoutes");
const HotelRoutes = require("./routes/hotelRoutes");
const RoomRoutes = require("./routes/roomRoutes");
const BookingRoutes = require('./routes/bookingRoutes')
require("./associations");

const app = express()

app.use(cors());

app.use(express.json())
app.use("/bookings", BookingRoutes)
app.use("/guests", GuestRoutes)
app.use("/hotels", HotelRoutes)
app.use("/rooms", RoomRoutes)

const PORT = 4001

dbconfig.sync({
    force: false,
    alter: false
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`)
    })
})
.catch((error) => {
    console.log(error, "error in app.js")
})