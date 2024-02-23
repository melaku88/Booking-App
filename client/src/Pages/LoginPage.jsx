import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { UserContext } from '../UserContext'

function LoginPage() {
  // ------------------------------------------------
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserContext);
  // --------------------------------------------------
  const Login = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post('/login', { email, password });
      setUser(data);
      toast.success('Login successfull!')
      navigate('/account/')

    } catch (error) {
      alert('Login failed try again')
    }
  }
  // const Login = async (event) => {
  //   event.preventDefault();
  //   const res = await fetch('http://localhost:4000/login', {
  //     method: 'POST',
  //     body: JSON.stringify({ email, password }),
  //     headers: { 'Content-Type': 'application/json' },
  //     credentials: 'include',
  //   })
  //   if(res.status === 500 || res.status === 501){
  //     toast.error('wrong email or password, try again')
  //   }else if(res.status === 200){
  //     toast.success('Login successfull!')
  //     navigate('/')
  //     console.log(res.body)
  //   }
  // }
  return (
    <div className='grow flex items-center justify-center'>
      <div className="mb-32">
        <h1 className='text-3xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={Login}>
          <input type="email" placeholder='Email' value={email} onChange={ev => setEmail(ev.target.value)} required />
          <input type="password" placeholder='Password' value={password} onChange={ev => setPassword(ev.target.value)} required />
          <button className='primary'>Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className='text-blue-800 underline' to='/register'>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage