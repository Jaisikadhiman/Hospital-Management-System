import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Context } from '../main'
import logo from "../../public/logo.jpg"
import "./Navbar.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
    const navigateTo = useNavigate();
    const { isAuthenticated,setIsAuthenticated } = useContext(Context)
    const handleLogout = async () => {
        axios.get("/api/v1/user/patient/logout", { withCredentials:true }).then((resp) => {
           toast.success(resp.data.message)
        }).catch((err) => {
           toast.error(err.response.data.message)
            setIsAuthenticated(false);
        })
    }
    const handleLogin = () => {
        navigateTo("/login")
    }
    return (
        <div className='nav'>
            <div className='logo'></div>
            <h3 className='h3'>JESS CARE</h3>
            <div className='link'>
                <nav className='links'>
                    <Link className="home clr" to={"/"}>HOME</Link>
                    <Link className='about clr' to={"/appointment"}>APPOINTMENT</Link>
                    <Link className='appointment clr' to={"/about"}>ABOUT US</Link>
                </nav>
            </div>


            {isAuthenticated ? (<button className='logout btnn ' onClick={handleLogout}>Logout</button>) : (<button className='login btnn' onClick={handleLogin}>Login</button>)}
        </div>
    )
}

export default Navbar
