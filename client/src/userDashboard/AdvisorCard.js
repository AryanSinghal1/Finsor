import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import profile from '../images.jpeg'
import star from '../star.png'
function AdvisorCard(props) {
  const user = useSelector(x=>x.counter.user)
  const bookMeeting=async()=>{
    const data = {
      // username: user.email,
      username: "singh.avinash2363@gmail.com",
      advName: props.name,
      advmail: props.email
    }
    await axios.post("http://localhost:8000/api/book",data).then(e=>console.log(e));
  }
  return (
    <div className="w-[32%] m-1 h-[30%] border border-slate-600 rounded-lg flex">
                  <div className="w-[40%] h-full bg-black flex flex-col justify-center items-center">
                    <div className="w-[60%] h-1/2 my-[10px] bg-white rounded-full overflow-hidden">
                      <img src={profile} alt="meet" className="w-full h-full cover"></img>
                    </div>
                    <p className="text-white">{props.name}</p>
                  </div>
                  <div className="w-[60%] h-full flex justify-center items-center">
              <div className="h-[90%] w-[90%] flex flex-col justify-between">
              <div className=" w-full flex justify-between">
                <p className='text-lg'>{props.name}</p>
                <div className="flex items-center">
          <p className="text-xl">{props.ratings}</p><img src={star} className="w-[20px] h-[20px]"></img>
          </div>
                </div>
                {/* <p className='text-xs'>5+ Years of Experience</p>
                <p className='text-xs'>Intraday Trading, Long Term Investment</p>
                <p className='text-xs'>English, Hindi</p> */}
                <p className='text-xs'>{props.experience}+ Years of Experience</p>
                <p className='text-xs'>{props.speciality}</p>
                <p className='text-xs'>{props.language}</p>

              {/* <div className="h-[20%] w-full">
                <p className="text-lg font-semibold">Meeting Time</p>
                <p className="text-md">09:00 A.M.</p>
                </div> */}
                <button className="border border-[rgba(0,0,0,0.15)] px-3 rounded-md" onClick={()=>{bookMeeting(props.email)}}>Book Appointment</button>
                  </div>
                  </div>
                </div>
  )
}

export default AdvisorCard
