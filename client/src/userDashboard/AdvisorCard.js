import React from 'react'
import profile from '../images.jpeg'
import star from '../star.png'
function AdvisorCard() {
  return (
    <div className="w-[32%] m-1 h-full border border-slate-600 rounded-lg flex">
                  <div className="w-[40%] h-full bg-black flex flex-col justify-center items-center">
                    <div className="w-[70%] h-1/2 my-[10px] bg-white rounded-full overflow-hidden">
                      <img src={profile} alt="meet" className="w-full h-full cover"></img>
                    </div>
                    <p className="text-white">John Doe</p>
                  </div>
                  <div className="w-[60%] h-full flex justify-center items-center">
              <div className="h-[90%] w-[90%] flex flex-col justify-between">
              <div className=" w-full flex justify-between">
                <p className='text-lg'>John Doe</p>
                <div className="flex items-center">
          <p className="text-xl">5</p><img src={star} className="w-[20px] h-[20px]"></img>
          </div>
                </div>
                <p className='text-xs'>5+ Years of Experience</p>
                <p className='text-xs'>Intraday Trading, Long Term Investment</p>
                <p className='text-xs'>English, Hindi</p>

              {/* <div className="h-[20%] w-full">
                <p className="text-lg font-semibold">Meeting Time</p>
                <p className="text-md">09:00 A.M.</p>
                </div> */}
                <button className="border border-[rgba(0,0,0,0.15)] px-3 rounded-md">Book Appointment</button>
                  </div>
                  </div>
                </div>
  )
}

export default AdvisorCard
