import { useEffect, useState } from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Home from "./pages/Home"
import {Toaster} from "react-hot-toast"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Login from './pages/Login'
import axios from 'axios'
import { Context, server } from './main'
import { useContext } from 'react'
function App() {
  const {setUser,setIsAuthenticated,setLoading}=useContext(Context)
  useEffect(()=>{
    setLoading(true)
axios.get(`${server}/users/me`,{
  withCredentials:true
}).then(res=>{
 setUser( res.data.user);
 setIsAuthenticated(true)
 setLoading(false)
}).catch((error)=>{
setUser({})
setIsAuthenticated(false)
setLoading(false)
})
  },[])

  return (
    <>
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <Toaster/>
    </Router>
   </>
  )
}

export default App
