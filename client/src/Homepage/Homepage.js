import React from 'react'
import { Link } from 'react-router-dom'
import image from '../image1.webp'
function Homepage() {
  return (
    <div className='w-[80%] m-auto h-screen'>
      <div className='h-[10%] w-full bg-white flex justify-between items-center'>
        <h2 className='text-[30px] font-semibold'>Finsor</h2>
        <div></div>
        <div className='h-full w-[15%] flex justify-between items-center'>
            <button className='border border-slate-500 px-2 py-1 rounded-md'><Link to={'/register'}>Register</Link></button>
            <button className='border border-slate-500 px-2 py-1 rounded-md bg-black text-white'><Link to={'/login'}>Sign In</Link></button>
      </div>
      </div>
      <div className='h-[80vh] w-full flex justify-center items-center'>
      <div className='h-2/3 w-full flex'>
        <div className='h-full w-1/2 flex flex-col justify-around'>
            <h2 className='text-[40px] font-bold'>Manage your finances better</h2>
            <button className='border border-slate-500 w-[200px] p-2 rounded-md bg-black text-white'><Link to={'/login'}>Get Started</Link> </button>
        </div>
        <div className='h-full w-1/2'>
        <img className='h-full w-full' src={image}></img>
        </div>

      </div>
    </div>
    </div>
  )
}

export default Homepage
