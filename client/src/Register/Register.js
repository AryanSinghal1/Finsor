import React, { useState } from 'react'
import axios from 'axios';
function Register() {
  const [user, setUser] = useState({});
  const handleChange = (e) =>{
    setUser({...user, [e.target.name] : e.target.value});
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(user.password!==user.repassword){
      alert("Passwords Do Not Match");
    }else{
      console.log(user);
      await axios.post("http://localhost:8000/api/register", user);
    }
  }
  return (
    <div className='w-full h-screen flex justify-center items-center'>
    <div className='w-[25vw] h-[60vh] border border-slate-600 rounded-lg flex flex-col justify-center items-center'>
    <div className='w-[90%] h-[90%] flex flex-col justify-center items-center'>
      
      <form className='h-full w-full flex flex-col justify-around' onChange={(e)=>{handleChange(e)}} onSubmit={(e)=>{handleSubmit(e)}}>
        <div className='w-full h-[10%] flex justify-between items-center'>
        <div className='w-full h-1/2 flex justify-center items-center'>
          <label>Advisor</label>
      <input type="radio" name='role' value='1'>
        </input>
        </div>
        <div className='w-full h-1/2 flex justify-center items-center'>
          <label>User</label>
        <input type="radio" name='role' value='2'>
        </input>
        </div>
        </div>
          <label>Enter Name</label>
        <input name='name' type="text" placeholder='Enter Name'></input>
          <label>Enter Email</label>
        <input name='email' type="email" placeholder='Enter Email'></input>
          <label>Enter Phone Number</label>
        <input name='number' type="number" placeholder='Enter Phone Number'></input>
        <div className='w-full h-[10%] flex justify-between items-center'>
        <div className='w-full h-1/2 flex justify-center items-center'>
          <label>Male</label>
        <input type="radio" name='gender' value='Male'>
        </input>
        </div>
        <div className='w-full h-1/2 flex justify-center items-center'>
          <label>Female</label>
        <input type="radio" name='gender' value='Female'>
        </input>
        </div>
        </div>
          <label>Enter Password</label>
        <input name='password' type="text" placeholder='Enter Password'></input>
          <label>Confirm Password</label>
        <input name='repassword' type="text" placeholder='Re-Enter Password'></input>
        <input type="submit" value="Register"></input>
      </form>
    </div>
    </div>
    </div>
  )
}

export default Register;