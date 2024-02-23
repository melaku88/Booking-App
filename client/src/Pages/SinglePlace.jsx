import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWedget from './BookingWedget';

function SinglePlace() {
  const { id } = useParams();
  const [place, setPlace] = useState(null)
  const [showMorePhoto, setShowMorePhoto] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get(`/place/${id}`).then(response => {
        const { data } = response;
        setPlace(data)
      })
    }
  }, [id])
  // =========================================
  if (!place) {
    return '';
  }
  // ==========================================
  if (showMorePhoto) {
    return (
      <div className=" absolue inset-0 min-h-screen bg-white ">
        <div className=" px-8">
          <h2 className=' text-2xl mr-36'>{place.title}</h2>
          <button onClick={() => setShowMorePhoto(false)} className=' fixed flex gap-1 py-1 px-4 rounded-2xl shadow shadow-gray-500 right-12 top-20'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeDashoffset="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Close photos
          </button>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-2">
          {place?.photos?.length > 0 && (
            place.photos.map((photo, i) => (
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
      <h1 className='text-xl font-semibold text-gray-500'>{place.title}</h1>
      <a className=' font-semibold flex gap-1 pl-2 underline text-blue-700 text-sm my-3' target='_blank' href={"https://maps.google.com/?q=" + place.address}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 font-bold ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        {place.address}
      </a>
      {/* =========================================================================== Photo gallery */}
      <div className="relative">
        <div className=" grid gap-4 grid-cols-[2fr_1fr] overflow-hidden rounded-2xl">
          <div className=''>
            {place.photos?.[0] && (
              <img onClick={() => setShowMorePhoto(true)} className=' aspect-square object-cover w-full cursor-pointer' src={'http://localhost:4000/' + place.photos[0]} alt="" />
            )}
          </div>
          <div className=" grid">
            {place.photos?.[1] && (
              <img onClick={() => setShowMorePhoto(true)} className=' aspect-square object-cover w-full cursor-pointer' src={' http://localhost:4000/' + place.photos[1]} alt="" />
            )}
            <div className=" overflow-hidden">
              {place.photos?.[2] && (
                <img onClick={() => setShowMorePhoto(true)} className=' aspect-square object-cover relative top-2 w-full cursor-pointer' src={' http://localhost:4000/' + place.photos[2]} alt="" />
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
      <div className=" mt-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        <div className="">
          <div className="my-4">
            <h2 className=' font-semibold text-xl mb-2'>description</h2>
            {place.description}
          </div>
          <div className=" bg-white p-3 rounded-xl">
            Check in: {place.checkIn}<br />
            Check out: {place.checkOut}<br />
            Max. number of guest: {place.maxGuest}
          </div>
        </div>
        <BookingWedget place={place} />
      </div>
      <div className=" bg-gray-300 -mx-8 px-8 py-3 mt-8">
        <div className="">
          <h2 className=' font-semibold text-xl mb-2'>extra info.</h2>
        </div>
        <div className=" mb-4 mt-1 text-sm text-gray-800 leading-5">{place.extraInfo}</div>
      </div>
    </div>
  )
}

export default SinglePlace