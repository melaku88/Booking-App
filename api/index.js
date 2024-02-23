const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const UserModel = require('./models/User')
const BookingModel = require('./models/Booking')
const PlaceModel = require('./models/Place')
const bcrypt = require('bcrypt')
const SECRET = 'kjjs746sdsaj6371vdadbvav'
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader')
const multer = require('multer')
const fs = require('fs')

// MiddleWare
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));
app.use(express.json())
app.use(cookieParser())
// Connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    })
  })
  .catch(err => console.log(err))

// ============================= Regisster
app.post('/register', (req, res) => {
  const { name, email, password } = req.body
  if (name === '' || email === '' || password === '') {
    return res.status(500).json({ msg: 'All fields must be filled' })
  } else {
    UserModel.findOne({ email })
      .then(user => {
        if (user) {
          return res.status(501).json({ msg: 'The user is already registered, try by other email' })
        } else {
          bcrypt.hash(password, 10)
            .then(hashedPass => {
              UserModel.create({ ...req.body, password: hashedPass })
                .then(user => {
                  return res.status(200).json(user)
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        }
      }).catch(err => console.log(err))
  }
})

// ====================================== Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const userDoc = await UserModel.findOne({ email })
    if (!userDoc) {
      return res.status(500).json({ msg: "Incorrect email or password, try again!" })
    } else {
      const passOk = await bcrypt.compare(password, userDoc.password)
      if (passOk) {
        jwt.sign({ email: userDoc.email, id: userDoc._id }, SECRET, {}, (err, token) => {
          if (err) {
            throw err
          } else {
            return res.cookie("token", token).status(200).json(userDoc)
          }
        })
      } else {
        return res.status(501).json({ msg: "Incorrect email or password, try again!" })
      }
    }
  } catch (error) {
    return res.status(400).json(error)
  }
})
// =============================== Profile
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, SECRET, {}, async (err, decoded) => {
      if (err) {
        throw err
      } else {
        const { name, email, _id } = await UserModel.findById(decoded.id)
        res.json({ name, email, _id });
      }
    })
  } else {
    res.json({})
  }
})
// ============================= Logout
app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true)
})

// ======================================================================
app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg'
  await imageDownloader.image({
    url: link,
    dest: __dirname + 'uploads' + newName
  });
  res.json(newName)
})

// ==============================================================================================
// =============================================================================================
const photosMiddleWare = multer({ dest: 'uploads/' })
app.post('/upload', photosMiddleWare.array('photos', 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath)
  }
  res.json(uploadedFiles)
})
// =======================================================================
app.post('/places', (req, res) => {
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
    price
  } = req.body;
  const { token } = req.cookies;
  jwt.verify(token, SECRET, {}, async (err, decoded) => {
    if (err) throw err;
    const placeDoc = await PlaceModel.create({
      owner: decoded.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      price
    })
    return res.json(placeDoc)
  })
})
// ========================================================
app.get('/user-places', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, SECRET, {}, async (err, decoded) => {
    if (err) throw err;
    const { id } = decoded
    res.json(await PlaceModel.find({ owner: id }))
  })
})
// ========================================================
app.get('/place/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await PlaceModel.findById(id))
})
// ========================================================
app.put('/place', async (req, res) => {
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
    maxGuest,
    price
  } = req.body;
  const { token } = req.cookies;
  jwt.verify(token, SECRET, {}, async (err, decoded) => {
    if (err) throw err;
    const placeDoc = await PlaceModel.findById(id);
    if (placeDoc.owner.toString() === decoded.id) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
        price
      })
      placeDoc.save();
      res.json('Ok')
    }
  })

})
// ========================================================
app.get('/places', async (req, res) =>{
  res.json(await PlaceModel.find())
})
// ========================================================
app.post('/bookings', async (req, res) =>{
  const { token } = req.cookies;
  jwt.verify(token, SECRET, {}, async (err, decoded) => {
    if (err) throw err;
    const {place, checkIn, checkOut, numberOfGuests, name, phone, price} = req.body;
    const bookingDoc = await BookingModel.create({place, checkIn, checkOut, numberOfGuests, name, phone, price, user: decoded.id});
    return res.json(bookingDoc)
  })
})
// ========================================================
app.get('/bookings', async (req, res) =>{
  const { token } = req.cookies;
  jwt.verify(token, SECRET, {}, async (err, decoded) => {
    if (err) throw err;
    return res.json( await BookingModel.find({user: decoded.id}).populate('place'))
  })
})

