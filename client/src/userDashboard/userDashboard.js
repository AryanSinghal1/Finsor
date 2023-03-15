import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Data } from "../Data";
import Switch from "react-switch";
// import { Button } from "antd";
import star from "../star.png";
import profile from "../images.jpeg";

import AdvisorCard from "./AdvisorCard";
import { useSelector } from "react-redux";
import axios from "axios";
// import { DateRangePicker } from "flowbite-datepicker";

function UserDashboard() {
  const [user, setUser] = useState({});
  const [check, setCheck] = useState(true);
  const [advisors, setAdvisors] = useState([]);
  const getAdvisors = async () => {
    const getAdvData = await axios.get("http://localhost:8000/api/getAdv");
    setAdvisors(getAdvData.data);

    const userid = localStorage.getItem("user");
    const userDetails={
      _id : JSON.parse(userid)
    }
const user = await axios.post("http://localhost:8000/api/getUser", userDetails).then(e=>{setUser(e.data[0]);});
  };
  useEffect(() => {
    getAdvisors();
  }, []);
  console.log(advisors);
  const bookMeeting=async()=>{
    const advisorLength = advisors.length;
    const advisorNo = Math.random() * (advisorLength-1);
    const numberAdv = Math.round(advisorNo);
    const data = {
      advisorId: advisors[numberAdv]._id,
      userId: user._id,
      advmail: advisors[numberAdv].email,
      // username: user.email,
      useName: user.name,
      username: user.email,
      advName: advisors[numberAdv].name
    }

    await axios.post("http://localhost:8000/api/book",data).then(e=>window.alert(`An Appointment with ${data.advName} has been Requested`));
  }
  return (
    <div className="flex-col h-[100vh] w-full">
      <div className="flex bg-black flex justify-center items-center h-[10%] w-full">
        <div className="flex items-center justify-between h-[90%] w-[95%]">
          <h1 className="text-white text-2xl font-bold">Finsor</h1>
          <div className="flex items-center h-full justify-between w-[15%]">
          <p className="text-white text-xl"><a href="http://ashu-crypto-hunt.netlify.app">Crypto Track</a></p>
          <img
                    src={profile}
                    alt="profile"
                    className="h-8 w-8 roundedull"
                  ></img>
        </div>
          {/* <div className="flex h-1/2 items-center w-3/5">
          <div className="flex h-full w-1/6 justify-center items-center text-white text-md">
            <p>Overview</p>
          </div>
          <div className="flex h-full w-1/6 justify-center items-center text-white text-md">
            <p>Documents</p>
          </div>
          <div className="flex h-full w-1/6 justify-center items-center text-white text-md">
            <p>Customers</p>
          </div>
          <div className="flex h-full w-1/6 justify-center items-center text-white text-md">
            <p>Suppliers</p>
          </div>
          <div className="flex h-full w-1/6 justify-center items-center text-white text-md">
            <p>Config</p>
          </div>
          <div className="flex h-full w-1/6 justify-center items-center text-white text-md">
            <p>History</p>
          </div>
        </div>
        <div className="flex items-center justify-end h-full w-1/5">
           <img className="w-12 h-12" src={CineLogo}></img> */}
          {/* </div> */}
        </div>
      </div>
      <div className="flex h-[90%] w-full bg-background justify-center items-center">
        <div className="flex justify-between items-center h-[95%] w-[98%]">
          <div className="h-full w-1/4 flex justify-center items-center">
            <div className="h-[95%] w-[95%] flex items-center flex-col">
              <div className="h-[50%] w-full flex justify-center items-center">
                <div className="h-[210px] w-[210px] rounded-full bg-black overflow-hidden">
                  <img
                    src={profile}
                    alt="profile"
                    className="h-full w-full cover"
                  ></img>
                </div>
              </div>
              <div className="flex py-[15px]">
                <h2 className="text-xl font-semibold px-2">{user.name}</h2>
                {/* <div className="flex items-center">
          <p className="text-xl">5</p><img src={star} className="w-[20px] h-[20px]"></img>
          </div> */}
              </div>
              <button className="px-4 py-2 border border-black rounded-lg">
                Edit Profile
              </button>
              {/* <div className="flex items-center">
            {check?<p>Available</p>:<p>Unavailable</p>}
          <Switch className="m-2" checked={check} onChange={()=>{setCheck(!check)}} onColor={'#000000'} checkedIcon={false} height={15} width={30} uncheckedIcon={false} />
          </div> */}
              {/* <div className="w-[80%] my-10">
            <p className="font-semibold text-lg">Recent Reviews</p>
            <div className="w-full my-3 flex flex-col">
            <div className="w-full flex justify-between items-center">
              <p className="text-lg font-semibold">Nice One</p>
              <div className="flex items-center">
          <p className="text-lg">5</p><img src={star} className="w-[20px] h-[20px]"></img>
          </div>
            </div>
              <p>Lorem Ipsum</p>
            </div>
          </div> */}
            </div>
            {/* <div className="flex items-center h-1/4 w-full">
            <div className="flex items-center h-[80%] w-full">
              <div className="flex flex-col justify-between items-start h-full w-full">
                <div className="h-1/4 w-full">
                  <h1 className="text-2xl font-bold">Current Status</h1>
                </div>
                <div className="h-[30%] w-2/3 rounded-xl flex justify-center border border-slate-600 items-center">
                  <div className="h-[90%] w-[90%] flex justify-between items-center">
                    <div className="h-full w-[40%] flex border justify-between items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                        />
                      </svg>
                      <p className="font-bold text-xl">Alerts</p>
                    </div>
                    <div className="h-6 w-6 rounded-full bg-yellow-300 flex justify-center items-center">
                      <p className="font-bold text-xl">1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
            {/* <div className="flex flex-col justify-between items-start h-3/4 w-full ">
            <div className="flex flex-col justify-center items-start rounded-xl w-[80%] h-[23%] bg-white">
              <div className="w-full h-1/3 flex items-center">
                <p className="text-xl font-bold px-4">This Year</p>
              </div>
              <div className=" w-full h-2/3 flex flex-col justify-start items-center">
                <div className=" w-full h-2/3 flex flex-col justify-center items-center">
                  <p className="text-xl font-bold">&euro; 1,000.62</p>
                </div>
                <div className=" w-full h-1/3 flex justify-center items-center">
                  <div className=" w-1/2 h-full flex justify-center items-center">
                    <p className="text-sm text-green-600">&euro; 1,000.62</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="green"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                      />
                    </svg>
                  </div>
                  <div className=" w-1/2 h-full flex justify-center items-center">
                    <p className="text-sm text-red-600">&euro; 1,000.62</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="red"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-start rounded-xl w-[80%] h-[23%] bg-white">
              <div className="w-full h-1/3 flex items-center">
                <p className="text-xl font-bold px-4">Receivable</p>
              </div>
              <div className=" w-full h-2/3 flex flex-col justify-start items-center">
                <div className=" w-full h-2/3 flex flex-col justify-center items-center">
                  <p className="text-xl font-bold">&euro; 1,000.62</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start rounded-xl w-[80%] h-[23%] bg-white">
              <div className="w-full h-1/3 flex items-center">
                <p className="text-xl font-bold px-4">Payable</p>
              </div>
              <div className=" w-full h-2/3 flex flex-col justify-start items-center">
                <div className=" w-full h-2/3 flex flex-col justify-center items-center">
                  <p className="text-xl font-bold">&euro; 1,000.62</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start rounded-xl w-[80%] h-[23%] bg-white">
              <div className="w-full h-1/3 flex items-center">
                <p className="text-xl font-bold px-4">Scheduled</p>
              </div>
              <div className=" w-full h-2/3 flex flex-col justify-start items-center">
                <div className=" w-full h-2/3 flex flex-col justify-center items-center">
                  <p className="text-xl font-bold">&euro; 1,000.62</p>
                </div>
              </div>
            </div>
          </div> */}
          </div>
          <div className="flex-col justify-center items-center h-full w-3/4">
            {/* <div className="flex items-center h-1/3 w-full">
            <div className="flex items-center h-[80%] w-full">
              <div className="flex flex-col justify-between items-start h-full w-full"> */}
            {/* <div className="h-1/4 w-full">
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                </div>
                <div className="h-full w-[300px] flex justify-center items-center rounded-lg bg-[rgba(0,0,0,0.03)]">
                  <div className="w-[92%] h-[92%] flex flex-col justify-around">
                    <p className="text-slate-600">Earnings</p>
                    <p className="text-3xl">Rs. 1500</p>
                    <p className="text-slate-600 text-xs">**** 4562</p>
                  </div>
                </div> */}
            {/* <div className="h-2/3 w-1/2 flex flex-col justify-start items-center">
                  <div className="h-1/3 w-full flex items-center">
                    <p className="font-bold text-md">Period</p>
                  </div>
                  <div className="h-2/3 w-full flex justify-start items-center">
                    <div className="h-full w-2/3 flex justify-between items-center">
                      <div
                        datepicker="true"
                        id="dateChose"
                        className="w-[48%] h-2/3 bg-white rounded-lg flex justify-between items-center relative"
                      >
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <input
                          datepicker="true"
                          name="start"
                          type="text"
                          className="sm:text-sm rounded-lg focus:ring-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark: dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="From"
                          onFocus={(e) => (e.target.type = "date")}
                        />
                      </div>
                      <div className="w-[48%] h-2/3 bg-white rounded-lg flex justify-between items-center relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <input
                          datepicker="true"
                          name="start"
                          type="text"
                          className="cursor-pointer sm:text-sm rounded-lg focus:ring-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark: dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="To"
                          onFocus={(e) => (e.target.type = "date")}
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
            {/* </div>
            </div>
          </div> */}
            <div className="my-5 h-full w-full flex flex-col justify-start ">
              <div className="w-[98%] h-[10%] flex justify-between">
                <h2 className="text-2xl">Select Advisor</h2>
                <button className="px-2 py-2 bg-black text-white rounded-lg" onClick={()=>{bookMeeting()}}>
                  Choose at Random
                </button>
              </div>
              <div className="my-2 h-[90%] full flex flex-wrap justify-center items-center">
                <div className="h-[98%] w-full flex flex-wrap">
                  {advisors.map((e) => {
                    return (
                      <AdvisorCard
                      id={e._id}
                        name={e.name}
                        email={e.email}
                        ratings={"5"}
                        experience={"5"}
                        speciality={"Finance"}
                        language={"English"}
                      ></AdvisorCard>
                    );
                  })}
                </div>
              </div>
              {/* <div className="h-1/2 w-full flex justify-center items-center rounded-xl bg-white">
              <div className="h-[95%] w-[98%] rounded-xl bg-white">
                <div className="flex items-center h-[10%] w-full ">
                  <h3 className="text-2xl font-bold">Profit and Loss</h3>
                </div>
                <div className="flex items-center justify-center h-[90%] w-full">
                  <div className="flex items-center justify-center h-full w-3/4">
                    <Bar
                      data={chartData}
                      style={{ height: "85%", width: "80%" }}
                      options={chartOptions}
                    />
                  </div>
                  <div className="flex flex-col justify-end items-end h-full w-1/4">
                    <p className="font-bold text-xl">Total: &euro;1000.62</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-1/2 w-full flex justify-center items-center">
              <div className="h-full w-1/2 flex flex-col justify-center items-center">
                <div className="h-[90%] w-[90%] flex flex-col justify-center items-center">
                  <div className="flex items-center h-[10%] w-full ">
                    <p className="text-md font-bold">Income</p>
                  </div>
                  <div className="h-[90%] w-full ">
                    <Doughnut
                      data={pieChartData}
                      style={{ height: "85%", width: "80%" }}
                      options={pieChartOptions}
                    />
                  </div>
                </div>
              </div>
              <div className="h-full flex flex-col justify-center items-center w-1/2">
                <div className="h-[90%] w-[90%] flex flex-col justify-center items-center">
                  <div className="h-[10%] w-full">
                    <p className="text-md font-bold">Expenses</p>
                  </div>
                  <div className="h-[90%] w-full">
                    <Doughnut
                      data={pieChartData}
                      style={{ height: "85%", width: "80%" }}
                      options={pieChartOptions}
                    />
                  </div>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
