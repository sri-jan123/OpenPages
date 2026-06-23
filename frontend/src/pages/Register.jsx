import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {URL} from '../url';

function Register() {
  const[username,setUsername]=useState("");
  const[password,setPassword]=useState("");
  const[email,setEmail]=useState("");
  const[error,setError]=useState("");
  const navigate=useNavigate();

   const handleRegister=async()=>{
    try{
      const res = await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
     setUsername(res.data.username)
     setEmail(res.data.email)
     setPassword(res.data.password)
     setError(false)
     navigate("/login")

    }
    catch(err){
      setError(true);
      console.log(err)
    }
   }

  return (
    <div className='w-full flex justify-center items-center h-[70vh]'>

    <div className='flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%] '>

     <h1 className='text-xl font-bold text-left'>Create an account</h1>
     <input type='text' onChange={(e)=>{
      setUsername(e.target.value)
     }} placeholder='enter your username' className='w-full px-4 py-2 border-black border-2'></input>

     <input type='email' onChange={(e)=>{
      setEmail(e.target.value)
     }} placeholder='enter your email' className='w-full px-4 py-2 border-black border-2'></input>

     <input type='password'onChange={(e)=>{
      setPassword(e.target.value)
     }} placeholder='enter your password' className='w-full px-4 py-2 border-black border-2 '></input>


     {error && <h3 classname='text-red-500 text-sm'>Something went wrong</h3>}
     <button onClick={handleRegister} className='w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black'>Register</button>

     <div className='flex justify-center items-center space-x-4'>
        <p>Already a user?</p>
    <Link to='/login'><p className='text-gray-500 hover:text-black'>Login</p></Link>
     </div>
    </div>
  
</div>
  )
}
export default Register;
