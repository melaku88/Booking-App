import React, { useEffect, useState } from 'react'
import Perks from './Perk';
import PhotosUploader from './PhotosUploader';
import AccountNav from './AccountNav';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

function PlacesFormPage() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuest, setMaxGuest] = useState(1)
  const [price, setPrice] = useState(100)

  const [redirect, setRedirect] = useState(false)

  // -----------------------------------------------
  function inputHeader(text) {
    return <h2 className=' text-xl font-medium mt-4'>{text}</h2>
  }
  function inputDescription(text) {
    return <p className='text-gray-700 text-sm'>{text}</p>
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    )
  }
  // ==============================================
  async function addNewPlace(ev) {
    ev.preventDefault();
    const placeData = { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuest, price };
    if(!id){
      // add new place
      await axios.post('/places', placeData);
      // setRedirect(true)
      window.location.href = '/account/places';
    }else{
      // update
      await axios.put('/place',{id, ...placeData});
      // setRedirect(true)     
      window.location.href = '/account/places';
    }
  }
  // ===============================================
  if (redirect) {
    return <Navigate to={'/account/places'} />
  }
  // =========================================
  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get('/place/' + id).then(response => {
        const { data } = response;
        setTitle(data.title)
        setAddress(data.address)
        setAddedPhotos(data.photos)
        setPerks(data.perks)
        setDescription(data.description)
        setExtraInfo(data.extraInfo)
        setCheckIn(data.checkIn)
        setCheckOut(data.checkOut)
        setMaxGuest(data.maxGuest)
        setPrice(data.price)

      })
    }
  }, [id])
  // =========================================

  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
        {preInput('Title', 'Title for your place. should be short and catchy as in advertisment')}
        <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />

        {preInput('Address', 'Address to this place')}
        <input type="text" placeholder='detail description' value={address} onChange={e => setAddress(e.target.value)} />

        {preInput('Photos', 'More = better')}
        <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />

        {preInput('Description', 'Description to this place')}
        <textarea rows="5" value={description} onChange={e => setDescription(e.target.value)} />

        {preInput('Perks', 'Select all the perks of your place')}
        <div className=" grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-4">
          <Perks perks={perks} setPerks={setPerks} />
        </div>

        {preInput('Extra informations', 'House rules etc.')}
        <textarea rows="4" value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />

        <h2 className=' text-xl font-medium mt-4'>Check in&out times, max guests</h2>
        <p className='text-gray-700 text-sm'>add check in and out times, remember to have some time window for cleaning the room between guests</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
          <div className="">
            <h3 className='mt-2 -mb-1 font-medium'>check in time</h3>
            <input type="text" placeholder='14' value={checkIn} onChange={e => setCheckIn(e.target.value)} />
          </div>
          <div className="">
            <h3 className='mt-2 -mb-1 font-medium'>check out time</h3>
            <input type="text" placeholder='06' value={checkOut} onChange={e => setCheckOut(e.target.value)} />
          </div>
          <div className="">
            <h3 className='mt-2 -mb-1 font-medium'>maximum number of guests</h3>
            <input type="number" placeholder='5' value={maxGuest} onChange={e => setMaxGuest(e.target.value)} />
          </div>
          <div className="">
            <h3 className='mt-2 -mb-1 font-medium'>Price per night</h3>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
          </div>
        </div>
        <button className='primary my-4'>Save</button>
      </form>
    </div>
  )
}

export default PlacesFormPage