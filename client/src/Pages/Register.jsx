import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


function RegisterPage() {
  // ------------------------------------------------
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  const Register = (ev)=>{
    ev.preventDefault()
    fetch('http://localhost:4000/register',{
      method: 'POST',
      body: JSON.stringify({  name, email, password}),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response =>{
      if(response.status === 200){
        toast.success('Registered successfully!')
        navigate('/login')
      }else if(response.status ===500){
        toast.error('All fields must be filled')
      }else if(response.status === 501){
        toast.error('The email is already registered, try by an other email')
      }
    })
    // --------------------------------------------
  }
  return (
    <div className='grow flex items-center justify-center'>
      <div className="mb-32">
        <h1 className='text-3xl text-center mb-4'>Register</h1>
        <form onSubmit={Register} className='max-w-md mx-auto'>
          <input type="text" placeholder='Name' value={name} onChange={ev => setName(ev.target.value)}/>
          <input type="email" placeholder='Email' value={email} onChange={ev => setEmail(ev.target.value)}/>
          <input type="password" placeholder='Password' value={password} onChange={ev => setPassword(ev.target.value)}/>
          <button className='primary'>Register</button>
          <div className="text-center py-2 text-gray-500">
            Have already an account? <Link className='text-blue-800 underline' to='/login'>Login now</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage