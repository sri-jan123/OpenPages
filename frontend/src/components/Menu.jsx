import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import {URL} from '../url';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Menu() {

    const {user}=useContext(UserContext);
    console.log("User data:", user);
    const{setUser}=useContext(UserContext);

    const handleLogout=async()=>{
        const res= await axios.get(URL+"/api/auth/logout",{withCredentials:true})
        console.log(res.data)
        setUser(null)
    }
  return (
    
<div className='bg-black w-[200px] flex flex-col absolute top-12 right-6 md:right-32 p-4 rounded-md space-y-4 z-50'>      { !user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'>Login</h3>}
      { !user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'>Register</h3>}
      {user && (
  <Link to={`/profile/${user.id}`}>
    {user && (
  <Link to="/profile">
    <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
      Profile
    </h3>
  </Link>
)}
  </Link>
)}
      { user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'>Write</h3>}
      { user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'>MyBlogs</h3>}
      { user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer' onClick={handleLogout}>Logout</h3>}
    </div>
  )
}
export default Menu;
