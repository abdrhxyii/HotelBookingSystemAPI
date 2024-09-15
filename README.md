Below are smaple data that u can use for create (POST) endpoints. NOTE: Admin role user can be created only manually. By Postman or any other ways...

Hotel?propertues
{
    "image": "https://static.vecteezy.com/system/resources/thumbnails/008/084/006/small_2x/abstract-decorative-aesthetic-mint-green-background-free-vector.jpg",
    "name": "Luxury Hotel",
    "location": "New York",
    "description": "A luxury hotel in the heart of New York.",
    "starRating": 4.5,
    "amenities": ["Free Wi-Fi", "Swimming Pool", "Gym", "Spa"],
    "streetAddress": "123 5th Avenue",
    "isCreditCardNeed": true,
}

Rooms

{
  "hotelId": 1,
  "roomType": "Deluxe",
  "occupancy": 2,
  "beds": 1,
  "childrenAllowed": 1,
  "pricePerNight": 200.00
}


guest

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": ""
  "role": "" <- "guest" || "admin"
}
