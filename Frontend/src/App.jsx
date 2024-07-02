import React from 'react';
import "./App.css" ;
import  { useContext, useEffect } from "react";
import { Context } from "./main";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import AboutUs from "./Pages/AboutUs"
import  Appointment from "./Pages/Appointment"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar'
import Footer from './Components/Footer';
const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  useEffect(()=>{
    const  fetchUser=async()=>{
      try {
        const resp= await axios.get("/api/v1/user/patient/me",{
          withCredentials:true
        });
        setIsAuthenticated(true);
        setUser(resp.data.user)
      } catch (err) {
        setIsAuthenticated(false)
        setUser({})
      }
    }
    fetchUser();
  },[isAuthenticated])
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/appointment" element={<Appointment/>} />
        </Routes>
        <Footer/>
        <ToastContainer />
      </Router>
    </div>
  )
}

export default App
