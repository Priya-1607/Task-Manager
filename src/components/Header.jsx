import React, { useContext } from 'react'
import { Link ,Navigate} from 'react-router-dom'
import { Context } from '../main'
import { server } from "../main";
import toast from "react-hot-toast";
import axios from "axios"
//import "../styles/header.scss"

const Header=()=> {
 const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context);
 console.log(isAuthenticated);
 const logoutHandler=async()=>{
setLoading(true);
try {
  await axios.get(`${server}/users/logout`,{
      
      withCredentials:true
  })
toast.success("Logot Successfully")
setIsAuthenticated(false)
setLoading(false)
} catch (error) {
  toast.error(error.response.data.message);
  setIsAuthenticated(true)
  setLoading(false)
}
}
  return (
   
      <>
        <nav className='header'>
            <div>
               <h2>Todo App</h2>
            </div>
            <article>
                <Link to={"/"}>Home</Link>
                <Link to={"/profile"}>Profile</Link>
                {/* <Link to={"/login"}>Login</Link>  */}
                {
                  isAuthenticated ? <button className='btn' disabled={loading} onClick={logoutHandler}>Logout</button> :<Link to="/login">Login</Link>
                }
                 {/* <button className='btn'>Login</button> */}
            </article>
        </nav>
      
        </>
  )
}
export default Header