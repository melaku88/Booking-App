import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

function BookingWedget({ place }) {
  // ================================================
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [numberOfGuests, setNumberOfGuests] = useState(1)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [redirect, setRedirect] = useState('')
  const {user} = useContext(UserContext)
  let numberOfNights = 0;
  // ================================================
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }
  // ================================================
  async function BookThisPlace(ev){
    ev.preventDefault()
    const Datas = {checkIn, checkOut, numberOfGuests, name, phone, place: place._id, price: numberOfNights * place.price }
    const {data} = await axios.post('/bookings', Datas);
    const bookingId = data._id;
    window.location.href = `/account/booking/${bookingId}`
  }
  // ===============================================
  useEffect(()=>{
    setName(user.name)
  }, [user])
  // ================================================
  return (
    <div className=" bg-white rounded-2xl p-4">
      <div className=" text-base font-semibold mb-2 text-center">
        price: Br{place.price} / per night
      </div>
      <div className=" border p-4 rounded-2xl">
        <div className="mt-2 bg-gray-100 py-2 px-4 rounded-2xl text-sm">
          <label>Check in: </label>
          <input type="date" value={checkIn} onChange={(ev) => setCheckIn(ev.target.value)} />
        </div>
        <div className=" mt-2 bg-gray-100 py-2 px-4 rounded-2xl text-sm">
          <label>Check out: </label>
          <input type="date" value={checkOut} onChange={(ev) => setCheckOut(ev.target.value)} />
        </div>
        <div className=" mt-2 bg-gray-100 py-2 px-4 rounded-2xl text-sm">
          <label>Number of guests: </label>
          <input type="number" value={numberOfGuests} onChange={(ev) => setNumberOfGuests(ev.target.value)} />
        </div>

        {numberOfNights > 0 && (
          <>
            <div className=" mt-2 bg-gray-100 py-2 px-4 rounded-2xl text-sm">
              <label>Your full name: </label>
              <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} />
            </div>
            <div className=" mt-2 bg-gray-100 py-2 px-4 rounded-2xl text-sm">
              <label>Phone number: </label>
              <input type="tel" value={phone} onChange={(ev) => setPhone(ev.target.value)} />
            </div>
          </>
        )}

        <button onClick={BookThisPlace} className=' bg-primary text-white py-1 px-8 rounded-2xl mt-4'>
          book this place
          {numberOfNights > 0 && (
            <span className=' ml-2'>{numberOfNights * place?.price}</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default BookingWedget