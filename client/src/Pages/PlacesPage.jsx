import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios';
import AccountNav from './AccountNav';

function PlacesPage() {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data)
    }).catch(err => console.log(err))
  }, [])
  // ==============================================
  // ==============================================
  return (
    <div>
      <AccountNav/>
      <div className=" text-center">
        <Link className='bg-primary text-white py-2 px-6 rounded-full inline-flex' to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add new place
        </Link>
      </div>

      <div className="mt-4">
        {places?.length > 0 ? (
          places.map((place, index) => (
            <Link to={'/account/places/' + place._id} className="flex gap-4 bg-gray-100 rounded-2xl p-4 mt-4 cursor-pointer" key={index}>
              <div className=" flex w-32 h-32 bg-gray-300 shrink-0">
                {place?.photos.length > 0 && (
                  <img src={'http://localhost:4000/'+ place.photos[0]} className=' object-cover' alt="" />
                )}
              </div>
              <div className=" grow-0 shrink">
                <h2 className=' mb-2 font-semibold'>{place.title}</h2>
                <p>{place.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className=" text-center">
            <div className="">No placec yet!</div>
          </div>
        )}
      </div>

    </div>

  )
}
export default PlacesPage