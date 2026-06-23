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
    
    <div className='bg-black w-[200px] flex flex-col items-start absolute top-12 rounded-md  md:right-32 p-4 right-6 space-y-4'>
      { !user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'>Login</h3>}
      { !user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'>Register</h3>}
      {user && (
  <Link to={`/profile/${user.id}`}>
    <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'>
      Profile
    </h3>
  </Link>
)}
      { user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'>Write</h3>}
      { user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'>MyBlogs</h3>}
      { user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer' onClick={handleLogout}>Logout</h3>}
    </div>
  )
}
export default Menu;
