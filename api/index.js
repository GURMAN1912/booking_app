const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/User.js");
const CookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const { resolve } = require("path");
const { rejects } = require("assert");
// emitter.setMaxListeners(15); // Increase the limit to 15 (or the number you need)

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fhdofhorbuaojhdasfhouuw";
// mongoose.connect("mongodb://localhost:27017");
const connectToDB = async () => {
    try {
      await mongoose.connect(
        "mongodb://localhost:27017",
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        }
      );
      console.log("MongoDB connected");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  };
  connectToDB();

app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(CookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
//   try {
//     const userDoc = await User.create({
//       name,
//       email,
//       password: bcrypt.hashSync(password, bcryptSalt),
//     });
//     res.json(userDoc);
//   } catch (e) {
//     res.status(422).json(e);
//   }
try {
    // Check if the username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // If the username doesn't exist, create a new user
    const userDoc = await User.create({
              name,
              email,
              password: bcrypt.hashSync(password, bcryptSalt),
            });
            console.log(userDoc)

    // You can also send the user data to another backend service using Axios
    // For example, sending the user data to another microservice
    // await axios.post('http://other-service/api/users', { username, password });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  // }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, _id: userDoc._id, name: userDoc.name },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.json("password not okay ");
      }
    } else {
      // res.json("not found")
    }
  } catch (e) {
    res.status(422).json(e);
  }
});
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      // const {name,email,_id}=await User.findById(userData.id)
      res.json(userData);
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

console.log({ __dirname });
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    console.log(userData._id);
    const placeDoc = await Place.create({
      owner: userData._id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});
app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { _id } = userData;
    res.json(await Place.find({ owner: _id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  // mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    console.log(userData._id);
    if (userData._id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});
app.post("/bookings",async (req, res) => {
    const{token}=req.cookies;
  const { place, checkIn, checkOut, maxGuests, name, phone, price } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    console.log(userData._id);
    const bookingDoc =await Booking.create({
      user: userData._id,
      place,
      checkIn,
      checkOut,
      maxGuests,
      name,
      phone,
      price,
    })
    res.json(bookingDoc);
  });
});


app.get("/bookings", async (req, res) => {
    const{token}=req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    console.log(userData._id);
    res.json(await Booking.find({user:userData._id}).populate("place"));
  });
});

//Pd7D3LuxQEcDG41w
app.listen(4000);
