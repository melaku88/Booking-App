import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import AccountNav from './AccountNav'

function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  let { subpage } = useParams()
  if (subpage === undefined) {
    subpage = 'profile'
  }
  const Logout = async () => {
    try {
      await axios.post('/logout')
      setUser(null)
      navigate('/')
    } catch (error) {
      console.log(err)
    }
  }
  // ==================================================
  return (
    <div className=''>
      <AccountNav/>
      {subpage === 'profile' && (
        <div className=" text-center max-w-lg mx-auto">
          Loged in as <span className=' font-semibold'>{user?.name}</span> ({user?.email})
          <button onClick={Logout} className=' bg-red-300 mt-2 w-80 rounded-md py-1'>Logout</button>
        </div>
      )}
      {subpage === 'place' && (
        <PlacesPage />
      )}
      {subpage === 'booking' && (
        <div className="">
          Booking Page
        </div>
      )}
    </div>
  )
}

export default ProfilePage