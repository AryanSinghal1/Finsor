import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import UserDashboard from './userDashboard/userDashboard';
import AdminDash from './AdvisorDash/advisorDash';
import UserManager from './userDashboard/userManager';
import Homepage from './Homepage/Homepage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/advisor' element={<AdminDash/>}></Route>
        <Route path='/user' element={<UserDashboard/>}></Route>
        <Route path='/personal' element={<UserManager/>}></Route>
        <Route path='/' element={<Homepage/>}></Route>
      </Routes>
           </div>
  );
}

export default App;
