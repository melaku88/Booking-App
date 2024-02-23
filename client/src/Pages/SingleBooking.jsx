import axios from 'axios'
import { differenceInCalendarDays, format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function SingleBooking() {
  // ======================================
  const { id } = useParams()
  const [booking, setBooking] = useState(null)
  const [showMorePhoto, setShowMorePhoto] = useState(false);
  useEffect(() => {
    axios.get('/bookings').then(response => {
      const bookingFound = response.data.find(({ _id }) => _id == id);
      if (bookingFound) {
        setBooking(bookingFound)
      }
    })
  }, [id])
  // ======================================
  if (!id) {
    return;
  }
    // ==========================================
    if (showMorePhoto) {
      return (
        <div className=" absolue inset-0 min-h-screen bg-white ">
          <div className=" px-8">
            <h2 className=' text-2xl mr-36'>{booking.place.title}</h2>
            <button onClick={() => setShowMorePhoto(false)} className=' fixed flex gap-1 py-1 px-4 rounded-2xl shadow shadow-gray-500 right-12 top-20'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeDashoffset="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Close photos
            </button>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-2">
            {booking.place?.photos?.length > 0 && (
              booking.place.photos.map((photo, i) => (
                <div className="" key={i}>
                  <img onClick={() => setShowMorePhoto(true)} className=' min-w-full' src={`http://localhost:4000/${photo}`} alt="" />
                </div>
              ))
            )}
          </div>
        </div>
      )
    }
    // =========================================
  return (
    <div className=' mt-4 bg-gray-100 -mx-8 py-8 px-8'>
      <h1 className='text-xl font-semibold text-gray-500'>{booking?.place.title}</h1>
      <a className=' font-semibold flex gap-1 pl-2 underline text-blue-700 text-sm my-3' target='_blank' href={"https://maps.google.com/?q=" + booking?.place.address}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 font-bold ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        {booking?.place.address}
      </a>
      {/* =========================================================================== */}
      <div className=" bg-gray-200 p-4 my-6 rounded-2xl">
        <h2 className=' text-xl'>Your booking information</h2>
        <div className=" flex gap-1 items-center mt-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeOpacity="1.5" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
          {differenceInCalendarDays(new Date(booking?.checkOut), new Date(booking?.checkIn))} nights :
          <div className=" flex gap-1 items-center text-sm ">
            <div className=" flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
              </svg>

              {booking?.checkIn}

              {/* {format(new Date(booking?.checkIn), 'dd-MM-yyy')} */}
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
            <div className=" flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
              </svg>
              {booking?.checkOut}

              {/* {format(new Date(booking?.checkOut), 'dd-MM-yyy')} */}
            </div>
          </div>
        </div>
        <div className=" flex gap-1 items-center mt-3 bg-primary text-white rounded-2xl p-2 font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeOpacity="1.5" stroke="currentColor" className="w-4 h-4 font-bold">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
          </svg>
          Total price: Br{booking?.price}
        </div>
      </div>
      {/* =========================================================================== Photo gallery */}
      <div className="relative">
        <div className=" grid gap-4 grid-cols-[2fr_1fr] overflow-hidden rounded-2xl">
          <div className=''>
            {booking?.place.photos?.[0] && (
              <img onClick={() => setShowMorePhoto(true)} className=' aspect-square object-cover w-full cursor-pointer' src={'http://localhost:4000/' + booking?.place.photos[0]} alt="" />
            )}
          </div>
          <div className=" grid">
            {booking?.place.photos?.[1] && (
              <img onClick={() => setShowMorePhoto(true)} className=' aspect-square object-cover w-full cursor-pointer' src={' http://localhost:4000/' + booking.place.photos[1]} alt="" />
            )}
            <div className=" overflow-hidden">
              {booking?.place.photos?.[2] && (
                <img onClick={() => setShowMorePhoto(true)} className=' aspect-square object-cover relative top-2 w-full cursor-pointer' src={' http://localhost:4000/' + booking?.place.photos[2]} alt="" />
              )}
            </div>

          </div>
        </div>
        <button onClick={() => setShowMorePhoto(true)} className=' flex gap-1 absolute bottom-2 right-2 text-xs font-semibold py-1 px-3  rounded bg-white shadow  shadow-gray-500'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          Show more photos
        </button>
      </div>
      {/* =================================================================================   */}
    </div>
  )
}

export default SingleBooking