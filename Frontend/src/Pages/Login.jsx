import React, { useContext, useState } from 'react'
import "./Login.css"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { Context } from '../main'
import { toast } from 'react-toastify'
import axios from 'axios'
const Login = () => {
    const [ email, setEmail ] = useState("")
    const [password, setPassword]  = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const navigateTo = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useContext(Context)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
       await axios.post("/api/v1/user/login",
                { email, password, confirmPassword, role: "Patient" },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }).then((resp)=>{
                    toast.success(resp.data.message)
                    setIsAuthenticated(true)
                    navigateTo("/")
                });
          
        } catch (error) {
            toast.error(error.response.data.message)
        }
       
    }
    if (isAuthenticated) {
        return <Navigate to={"/"} />
    }
    return (

        <div className='mainLog'>
            <div className="loginn">
                <div className="head">
                    <h2>Login Here</h2>
                    <h3>Please Login Here To Continue</h3>
                </div>

                <div className="logform">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name={email} placeholder='Email' className="fields" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" name={password} placeholder='Password' className="fields" onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" name={confirmPassword} placeholder='Confirm Password' className="fields" onChange={(e) => setConfirmPassword(e.target.value)} />
                        <p className='down_p'>Not Registered?<Link to={"/register"}>Register Now</Link></p>
                        <button className='logbtn'>Login</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login
