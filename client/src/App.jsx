import './App.css'
import { Routes, Route } from 'react-router-dom'
import IndexPage from './Pages/IndexPage'
import LoginPage from './Pages/LoginPage'
import Layout from './Pages/Layout'
import RegisterPage from './Pages/Register'
import axios from 'axios'
import UsercontextProvider from './UserContext'
import ProfilePage from './Pages/ProfilePage'
import PlacesPage from './Pages/PlacesPage'
import PlacesFormPage from './Pages/PlacesFormPage'
import BookingPage from './Pages/BookingPage'
import SinglePlace from './Pages/SinglePlace'
import SingleBooking from './Pages/SingleBooking'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UsercontextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account/' element={<ProfilePage />} />
          <Route path='/account/places' element={<PlacesPage />} />
          <Route path='/account/places/new' element={<PlacesFormPage />} />
          <Route path='/account/places/:id' element={<PlacesFormPage />} />
          <Route path='/place/:id' element={<SinglePlace />} />
          <Route path='/account/booking' element={<BookingPage />} />
          <Route path='/account/booking/:id' element={<SingleBooking />} />
        </Route>
      </Routes>
    </UsercontextProvider>
  )
}

export default App
