import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [adisor, setAdvisor] = useState(true)
  const [user, setUser] = useState({});
  const handleChange = (e) =>{
    setUser({...user, [e.target.name] : e.target.value});
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(user.password!==user.repassword){
      alert("Passwords Do Not Match");
    }else{
      user.role = adisor?1:2;
      console.log(user);
      // await axios.post("http://localhost:8000/api/register", user);
    }
  }
  return (
    <div className='w-[80%] m-auto h-screen flex flex-col items-center'>
      <div className='h-[10%] w-full bg-white flex justify-between items-center'>
        <h2 className='text-[30px] font-semibold'>Finsor</h2>
        <div></div>
        <div className='h-full w-[15%] flex justify-between items-center'>
            <button className='border border-slate-500 px-2 py-1 rounded-md'><Link to={'/register'}>Register</Link></button>
            <button className='border border-slate-500 px-2 py-1 rounded-md bg-black text-white'><Link to={'/login'}>Sign In</Link></button>
      </div>
      </div>
      <div className='h-[90%] w-full flex justify-center items-center'>
      <div className='w-[25vw] h-[60vh] border border-slate-600 rounded-lg flex flex-col justify-center items-center overflow-hidden'>
    <div className='w-full h-[10%]  flex justify-center items-center'>
    {adisor?<><div className='w-1/2 h-full rounded-br-md bg-black flex justify-center cursor-pointer items-center'>
          <h2 className='text-white'>Advisor</h2>
        </div>
        <div className='h-full w-1/2 flex justify-center items-center cursor-pointer' onClick={()=>{setAdvisor(false)}}>
          <h2>User</h2>
        </div></>:<><div onClick={()=>{setAdvisor(true)}} className='w-1/2 h-full cursor-pointer flex justify-center items-center'>
          <h2>Advisor</h2>
        </div>
        <div className='h-full bg-black text-white rounded-bl-md w-1/2 flex justify-center cursor-pointer items-center'>
          <h2>User</h2>
        </div></>}
      </div>
    <div className='w-full h-[90%] flex flex-col justify-center items-center'>
      <form className='h-full w-[90%] flex flex-col justify-around' onChange={(e)=>{handleChange(e)}} onSubmit={(e)=>{handleSubmit(e)}}>
      <label>Enter Name</label>
        <input name='name' type="text" placeholder='Enter Name'></input>
          <label>Enter Email</label>
        <input name='email' type="email" placeholder='Enter Email'></input>
          <label>Enter Phone Number</label>
        <input name='number' type="number" placeholder='Enter Phone Number'></input>
          <label>Enter Password</label>
        <input name='password' type="text" placeholder='Enter Password'></input>
          <label>Confirm Password</label>
        <input name='repassword' type="text" placeholder='Re-Enter Password'></input>
        <input className='p-2 bg-black text-white rounded-lg' type="submit" value="Register"></input>
      </form>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Register;