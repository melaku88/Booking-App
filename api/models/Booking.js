const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
  place: {type: mongoose.Schema.Types.ObjectId, ref: 'place', required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
  checkIn: {type: Date, required: true},
  checkOut: {type: Date, required: true},
  name: {type: String, required: true},
  phone: {type: String, required: true},
  numberOfGuests: {type: Number, required: true},
  price: {type: Number, required: true},
})
const BookingModel = mongoose.model('booking', BookingSchema)
module.exports = BookingModel;