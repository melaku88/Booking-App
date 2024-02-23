import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { Link } from 'react-router-dom'

function IndexPage() {

  const [places, setPlaces] = useState([])
  // =================================================
  useEffect(() => {
    axios.get('/places').then(response => {
      const { data } = response;
      setPlaces([...data])
    })
  }, [])
  // ================================================
  return (
    <div className=' mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8'>
      {places?.length > 0 && (
        places.map((place, i) => (
          <Link to={'/place/' + place._id} className="" key={i}>
            <div className=" bg-gray-300 rounded-xl mb-2 ">
              {place.photos?.[0] && (
                <img className='rounded-xl aspect-square object-cover' src={"http://localhost:4000/" + place.photos[0]} alt="" />
              )}
            </div>
            <h2 className=' text-xs text-gray-900'> {place.title}</h2>
            <div className="text-sm">
              <span className=' font-bold'>Br{place.price}</span> per night
            </div>
            <h3 className=' text-sm font-semibold italic'>{place.address}</h3>
          </Link>
        ))
      )}
    </div>
  )
}

export default IndexPage