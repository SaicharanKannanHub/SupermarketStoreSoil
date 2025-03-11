import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Components/LoginSignup/Login';
import Register from './Components/LoginSignup/Register';
import Navbar from './Controls/NavBar';
import  Home  from './Components/Home/Home';
import {getUser, removeUser } from './Components/LoginSignup/validation';
import MyProfile from './Components/Profile/Profile'; 
import Specials from './Components/SpecialComponents/Specials';
import SmallScaleFarming from './Components/SpecialComponents/SmallScaleFarming';
import Cart from './Components/Cart/cart';


import { useState, useEffect } from 'react';



function App() {
  const [user, setUser] = useState(getUser());


  const  loginUser = (user) => {
    setUser(user)
    console.log(user);
  }

  const logoutUser = () => {
    removeUser();
    setUser(null);
  }
  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar user={user} logoutUser={logoutUser} />
        <main role="main">
          <div className="container my-3">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/login" element={<Login loginUser={loginUser} />} />
              <Route path="/register" element={<Register loginUser={loginUser}></Register>} />
              <Route path="/profile" element={<MyProfile  user={user}/>} /> 
              <Route path="/specials" element={<Specials />} /> 
              <Route path="/small-scale-farming" element={<SmallScaleFarming />} /> 
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;
