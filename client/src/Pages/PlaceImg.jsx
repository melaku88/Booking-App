import React from 'react'

function PlaceImg({place, index=0}) {
  if(!place.photos?.length){
    return;
  }
  return (
    <img src={'http://localhost:4000/'+ place.photos[index]} className=' object-cover' alt="" />
  )
}

export default PlaceImg