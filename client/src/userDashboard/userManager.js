import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Data } from "../Data";
import Switch from "react-switch";
// import { Button } from "antd";
import star from '../star.png'
import edit from '../pencil.jpg'
import profile from '../images.jpeg'
import AdvisorCard from "./AdvisorCard";
import { useSelector } from "react-redux";
import axios from "axios";

function UserManager() {
const [income, setIncome] = useState(true);
const [user, setUser] = useState({});
const [set, setSet] = useState(false);
const [limituser, setLimitUser] = useState({});
const [totalIncome, setTotalIncome] = useState(0);
const [totalExpense, setTotalExpense] = useState(0);
const [show, setShow] = useState(false);
const [details, setDetails] = useState({});

const getFinances = async() => {
  const financeData = await axios.get("http://localhost:8000/api/expense");
  console.log(financeData.data);
  const incomeData = financeData.data.incomes.map(x=>x.amount);
  const expensesData = financeData.data.expenses.map(x=>x.amount);
  console.log(incomeData, expensesData);
  const expenses = expensesData.reduce((partialSum, a) => partialSum + a, 0);
setTotalExpense(expenses); 
const incomes = incomeData.reduce((partialSum, a) => partialSum + a, 0);
setTotalIncome(incomes); 
const userid = localStorage.getItem("user");
const userDetails={
  _id : JSON.parse(userid)
}
const user = await axios.post("http://localhost:8000/api/getUser", userDetails).then(e=>{setUser(e.data[0]);});
}
console.log(user);
useEffect(()=>{
  getFinances();
},[]);
const handleChange = (e) => {
  setDetails({...details, [e.target.name]:e.target.value});
}
const handleLimitChange = (e) => {
  setLimitUser({...limituser, [e.target.name]:e.target.value});
}
const handleLimitSubmit = async (e) =>{
  e.preventDefault();
  const id = localStorage.getItem("user")
  limituser.user = JSON.parse(id);
  await axios.post("http://localhost:8000/api/addaLimit", limituser).then((e)=>{console.log("Updated")})
}
const handleSubmit = async (e) =>{
  e.preventDefault();
  details.type = income?1:2;
  details.user = user._id;
  details.expense = totalExpense;
  await axios.post("http://localhost:8000/api/addDetail", details).then((e)=>{console.log("Updated")})
}
const [pieChartData, setPieChartData] = useState({
    labels: Data.map((e) => e.month),
    datasets: [
      {
        label: "My First Dataset",
        data: Data.map((e) => e.plvalue),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        height: "50px",
        hoverOffset: 4,
      },
    ],
    });
//   useEffect(() => {
//   var ctx = document.getElementById("dateChose");
//   console.log(ctx);
  //     var ctx = document.getElementById('canvas').getContext("2d");
  //   var gradient = ctx.createLinearGradient(0, 0, 0, 400);
  // gradient.addColorStop(0, 'rgba(250,174,50,1)');
  // gradient.addColorStop(1, 'rgba(250,174,50,0)');
  //     const dateRangePickerEl = document.getElementById('dateChose');
  // new DateRangePicker(dateRangePickerEl, {
  //     // options
  // });
//   }, []);
  const [chartData, setChartData] = useState({
  labels: Data.map((e) => e.month),
  datasets: [
    {
      type: "line",
      label: "Line Dataset",
      data: Data.map((e) => e.plvalue),
      backgroundColor: function (context) {
        var index = context.dataIndex;
        var value = context.dataset.data[index];
        return value < 0 ? "#FF8B8B" : "#E3FFF3";
      },
      backgroundColor: function (context) {
        var index = context.dataIndex;
        var value = context.dataset.data[index];
        return value < 0 ? "#FF8B8B" : "#E3FFF3";
      },
    },
    {
      type: "bar",
      label: "Bar Dataset",
      data: Data.map((e) => e.plvalue),
      backgroundColor: function (context) {
        var index = context.dataIndex;
        var value = context.dataset.data[index];
        console.log(index, value);
        return value < 0 ? "#FF8B8B" : "#E3FFF3";
      },
    },
  ],
  });
  const [chartOptions, setChartOptions] = useState({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      grid: {
        color: "rgba(0,0,0,0.05)",
      },
    },
    x: {
      grid: {
        color: "rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 14,
        },
      },
    },
  },
  });
  const [pieChartOptions, setPieChartOptions] = useState({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    // labels:{
    // },
    legend: {
      display: false,
      labels: {
        render: "percentage",
        fontStyle: "bolder",
        position: "outside",
        textMargin: 6,
        // This more specific font property overrides the global property
        font: {
          size: 14,
        },
      },
    },
  },
  });
  return (
    <div className="flex-col min-h-screen h-[130vh] w-full relative">
      {set && <div className="h-screen bg-[rgba(0,0,0,0.2)] w-full bg-white flex justify-center items-center overflow-hidden absolute top-0 left-0" >
         <div className="w-[30vw] h-[30vh] flex justify-center items-center bg-white rounded-lg">
        <div className="w-[90%] h-[90%] ">
          <div className="h-1/3 w-full flex justify-between">
            <h2 className="text-lg font-bold">Set Limit</h2>
            <p className="font-bold cursor-pointer" onClick={()=>{setSet(false)}}>X</p>
          </div>
          <div className="h-2/3 w-full flex justify-between">
            <form onChange={(e)=>{handleLimitChange(e)}} onSubmit={(e)=>{handleLimitSubmit(e)}} className="h-full w-full flex flex-col justify-between">
              <label>Set Limit</label>
              <input name="limit" placeholder="Enter Limit"></input>
              <input type="submit" value="Update Limit" className="px-4 py-2 bg-black text-white rounded-md"></input>
            </form>
          </div>
        </div>
        </div>
      </div>}
    {show && <div className="h-screen bg-[rgba(0,0,0,0.2)] w-full bg-white flex justify-center items-center overflow-hidden absolute top-0 left-0" >
    <div className='w-[30vw] h-[60vh] bg-white rounded-lg relative flex flex-col justify-center items-center overflow-hidden'>
      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[rgba(0,0,0,0.2)] flex justify-center items-center cursor-pointer" onClick={()=>{setShow(false)}}><p className="text-xl font-bold">X</p></div>
    <div className='w-full h-[15%]  flex justify-center items-center'>
    {income?<><div className='w-1/2 h-full rounded-br-md bg-black flex justify-center cursor-pointer items-center'>
          <h2 className='text-white'>Income</h2>
        </div>
        <div className='h-full w-1/2 flex justify-center items-center cursor-pointer' onClick={()=>{setIncome(false)}}>
          <h2>Expense</h2>
        </div></>:<><div onClick={()=>{setIncome(true)}} className='w-1/2 h-full cursor-pointer flex justify-center items-center'>
          <h2>Income</h2>
        </div>
        <div className='h-full bg-black text-white rounded-bl-md w-1/2 flex justify-center cursor-pointer items-center'>
          <h2>Expense</h2>
        </div></>}
      </div>
    <div className='w-full h-[85%] flex flex-col justify-center items-center'>
      <form className='h-full w-[90%] flex flex-col justify-around' onChange={(e)=>{handleChange(e)}} onSubmit={(e)=>{handleSubmit(e)}}>
        <label>Enter Title</label>
        <input name='title' type="text" placeholder='Enter Title'></input>
          <label>Enter Amount</label>
        <input name='amount' type="text" placeholder='Enter Amount'></input>
        <input className='p-2 bg-black text-white rounded-md' type="submit" value="Submit"></input>
      </form>
    </div>
    </div>
    </div>}
    <div className="flex bg-black flex justify-center items-center h-[10%] w-full">
      <div className="flex items-center h-[90%] w-[95%] justify-between">
        {/* <div className="flex items-center h-full w-1/5">
        </div> */}
          <h1 className="text-white text-2xl font-bold">Finsor</h1>
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
        <p className="text-white text-xl"><a href="http://ashu-crypto-hunt.netlify.app">Crypto Track</a></p>
      </div>
    </div>
    <div className="flex h-[96%] w-full bg-background justify-center items-center">
      <div className="flex justify-between items-center h-[95%] w-[98%]">
        <div className="h-full w-1/4 flex justify-center items-center">
        <div className="h-[95%] w-[95%] flex items-center flex-col">
          <div className="h-[30%] w-full flex justify-center items-center">
          <div className="h-[210px] w-[210px] rounded-full bg-black overflow-hidden">
            <img src={profile} alt="profile" className="h-full w-full cover"></img>
          </div>
          </div>
          <div className="flex py-[15px]">
          <h2 className="text-xl font-semibold px-2">{user.name}</h2>
          {/* <div className="flex items-center">
          <p className="text-xl">5</p><img src={star} className="w-[20px] h-[20px]"></img>
          </div> */}
          </div>
          <button className="px-4 py-2 border border-black rounded-lg">Edit Profile</button>
          <div className="flex items-center">
          <p className="font-semibold p-2">Monthly Limit: <span className="font-normal">Rs. {user.limit}</span></p>
          <img onClick={()=>{setSet(true)}} className="w-4 h-4" src={edit}></img>
          </div>
          
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
          {/* <div className="flex flex-col justify-between items-start h-3/4 w-full "> */}
{/*             
            <div className="flex flex-col justify-center items-start rounded-xl w-[80%] h-[23%] bg-white">
              <div className="w-full h-1/3 flex items-center">
                <p className="text-xl font-bold px-4">Scheduled</p>
              </div>
              <div className=" w-full h-2/3 flex flex-col justify-start items-center">
                <div className=" w-full h-2/3 flex flex-col justify-center items-center">
                  <p className="text-xl font-bold">&euro; 1,000.62</p>
                </div>
              </div>
            </div> */}
          {/* </div> */}
        </div>
        <div className="flex-col justify-center items-center h-full w-3/4">
          <div className="flex items-center h-1/3 w-full">
            <div className="flex items-center h-[80%] w-full">
              <div className="flex flex-col justify-between items-start h-full w-full">
                <div className="h-1/4 w-full flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                  <div>
                    <button className="px-4 py-2 border border-slate-600 rounded-md mx-2" onClick={()=>{setShow(true)}}>Create</button>
                  <select className="px-2 py-1 rounded-lg bg-[rgba(0,0,0,0.05)]">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                    <option>This Year</option>
                  </select>
                  </div>
                </div>
                <div className="flex w-full h-[25vh] justify-between items-center">
                <div className="h-full w-[32%] flex justify-center items-center rounded-lg bg-[rgba(0,0,0,0.03)]">
                  <div className="w-[92%] h-[92%] flex flex-col justify-around">
                <p className="text-xl font-bold">Overview</p>
                    <p className="text-slate-600">This Month</p>
                <div className=" w-full h-2/3 flex flex-col justify-center items-center">
                    <p className="text-3xl">Rs. {totalIncome-totalExpense}</p>
                </div>
                <div className=" w-full h-1/3 flex justify-center items-center">
                  <div className=" w-1/2 h-full flex justify-center items-center">
                    <p className="text-sm text-green-600">Rs. {totalIncome}</p>
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
                    <p className="text-sm text-red-600">Rs. {totalExpense}</p>
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
                <div className="h-full w-[32%] flex justify-center items-center rounded-lg bg-[rgba(0,0,0,0.03)]">
                  <div className="w-[92%] h-[92%] flex flex-col justify-around">
                <p className="text-xl font-bold">Income</p>
                    {/* <p className="text-slate-600">This Month</p> */}
                <div className=" w-full h-2/3 flex flex-col justify-center items-center">
                    <p className="text-3xl">Rs. {totalIncome}</p>
                </div>
                  </div>
                </div>
                <div className="h-full w-[32%] flex justify-center items-center rounded-lg bg-[rgba(0,0,0,0.03)]">
                  <div className="w-[92%] h-[92%] flex flex-col justify-around">
                <p className="text-xl font-bold">Expenses</p>
                    {/* <p className="text-slate-600">This Month</p> */}
                <div className=" w-full h-2/3 flex flex-col justify-center items-center">
                    <p className="text-3xl">Rs. {totalExpense}</p>
                </div>
                  </div>
                </div>
            </div>
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
            </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  </div>

  )
}

export default UserManager
