const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const router = require("./src/Routes/route");
const BikeSchema = require("./src/Models/BikeSchema");
const Booking = require("./src/Models/bookingSchema");
const CarSchema = require("./src/Models/CarSchema");


const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);



//====================[ Booking Vehicle ]=================/
const moment = require('moment'); 
app.post('/Booking_Vehicle', async (req, res) => {
  try {
    const bookingData = req.body;
    
    const existingBooking = await Booking.findOne({
      vehicleType: bookingData.vehicleType,
      startDate: { $lt: moment(bookingData.endDate).toDate() },
      endDate: { $gt: moment(bookingData.startDate).toDate() }, 
    });

    if (existingBooking) {
      return res.status(400).send({
        status: false,
        message: "Please choose different dates or vehicle already booked for this date and time",
      });
    }

    const booking = await Booking.create(bookingData);
    
    res.status(201).send({
      status: true,
      message: "Booking done Successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



//======================[ Bike Schema ]===========/
app.post('/bike', async (req, res) => {
    try {
        const newBike = new BikeSchema(req.body);
        const savedCar = await newBike.save();
        res.status(201).send({
            status: true,
            message: "Bike Added Successfully",
            data: savedCar,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//=====================[ Car Schema ]============/
app.post('/car', async (req, res) => {
    try {
        const newCar = new CarSchema(req.body);
        const savedCar = await newCar.save();
        res.status(201).send({
            status: true,
            message: "Car Added Successfully",
            data: savedCar,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//=====================[ Get Bike and Car Models ]===========/
app.get('/get-vehicles/:type', async (req, res) => {
    try {
        const { type } = req.params;
        let filter = {};

        if (type) {
            filter = { type };
        }

        let vehicles = [];

        if (type === 'bike') {
            vehicles = await BikeSchema.find(filter);
        } else if (type === 'car') {
            vehicles = await CarSchema.find(filter);
        } else {
            const bikes = await BikeSchema.find(filter);
            const cars = await CarSchema.find(filter);
            vehicles = { bikes, cars };
        }

        res.status(200).json({
            status: true,
            message: "Vehicles Retrieved Successfully",
            data: vehicles
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//====================[ Get booking No_of_wheels list ]=============/
app.get('/Get-wheels/:No_of_wheels', async (req, res) => {
    const { No_of_wheels } = req.params; 
    try {
      if (No_of_wheels === '2') {
        const bikes = await BikeSchema.find();
        res.status(201).send({
            status: true,
            message: "Bike Get Successfully",
            data: bikes,
        });
      } else if (No_of_wheels === '4') {
        const cars = await CarSchema.find();
        res.status(201).send({
            status: true,
            message: "Car Get Successfully",
            data: cars,
        });
      } else {
        res.status(400).json({ error: 'Invalid No_of_wheels value' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });



module.exports = router;
//===================== [ Database Connection ] ==================/

mongoose
    .connect(
        "mongodb+srv://pradumyabanke:nBJzW0oNx5EhhJkw@cluster0.5ljx3cx.mongodb.net/"
    )
    .then(() => console.log("Database is connected successfully.."))
    .catch((Err) => console.log(Err));

app.use("/", router);

app.listen(port, function () {
    console.log(`Server is connected on Port ${port} ✅✅✅`);
});



//mongodb+srv://pradumyabanke:nBJzW0oNx5EhhJkw@cluster0.5ljx3cx.mongodb.net/
//nBJzW0oNx5EhhJkw