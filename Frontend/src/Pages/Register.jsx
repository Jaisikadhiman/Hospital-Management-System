import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { Context } from '../main'
import "../Pages/Register.css"
const Register = () => {
  //  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [nic, setNic] = useState("")
  const [dob, setDob] = useState("")
  const [gender, setGender] = useState("")
  const [password, setPassword] = useState("")
  const naviagteTo = useNavigate();
  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      await axios.post("/api/v1/user/user/register", { firstName, lastName, email, phone, nic, dob, gender, password }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }).then((resp) => {
        console.log(resp.data)
        toast.success(resp.data.message)
      })
    } catch (error) {
      console.log(error.response.data)
      toast.error(error.response.data.message)
    }
  }
  // if(isAuthenticated){
  //   return <Navigate to={"/"} />
  // }


  return (
    <div>
      <div className="reg">
        <h2>Register Here</h2>
        <h3>Register here to continue</h3>
      </div>
      {/* <p>Lorem ipsum dolor, sit  libero quo dolorum exercitationem alias non ducimus sunt molestias, quis, excepturi optio recusandae.</p> */}
      <div className='register'>
        <form onSubmit={handleRegister} action="">
          <input className="field design" type='text' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input className="field design" type='text' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <input className="field design" type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="field design" type='number' placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input className="field design" type='number' placeholder='Nic' value={nic} onChange={(e) => setNic(e.target.value)} />
          <input className="field design" type='date' placeholder='Dob' value={dob} onChange={(e) => setDob(e.target.value)} />
          <select className="field design" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option  >Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input className="field design" type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          {/* <span>Already Registered?</span> */}
          {/* <Link  to={"/login"}>Login now</Link> */}
          {/* <button  type='submit'>Register now</button> */}

          <div style={{ marginLeft: 840 }}>
            <span>Already Registered?</span>
            <Link to={"/login"}>Login now</Link>
          </div>
      
<div>
<br/>
<button className='registerbtn' style={{ marginRight:120}} type='submit'>Register now</button>
</div>
        </form>
      </div>
    </div>
  )
}

export default Register
