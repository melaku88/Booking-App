import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext({})

function UsercontextProvider({children}) {

  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  // ===========================================
  useEffect(()=>{
    async function getUser(){
      if(!user){
        const {data} = await axios.get('/profile')
        setUser(data)
        setReady(true)
      }
    }
    getUser();
  }, []);
  // ================================================
  return (
    <UserContext.Provider value={{user, setUser, ready}} >
      {children}
    </UserContext.Provider>
  )
}

export default UsercontextProvider