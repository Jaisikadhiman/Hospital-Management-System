import React, { useState } from 'react'
import "./MessageForm.css"
import axios from "axios"
import { toast } from 'react-toastify'

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = async (e) => {
    //"/api/v1/message/send"
    e.preventDefault();
   try {
    await axios.post("/api/v1/message/send",{firstName,lastName,email,phone,message},{
      withCredentials:true,
      headers:{
        "Content-Type":"application/json"
      }
    }).then((resp)=>{
      toast.success(resp.data.message)
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
     
    }).catch((err)=>{
      toast.error(err.response.data.message)
      console.log("err.data.message",err.response.data.message)
    })
   } catch (error) {
    toast.success("errrrr",error)
    console.log("errrr",error)
   }
  }

  return (
    <div className='message'>

      <h1>Send Us A Message</h1>

      <form className='form' onSubmit={handleSubmit}>
        <input className="field design" type='text' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input className="field design" type='text' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input className="field design" type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="field design" type='number' placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
        <textarea className="textarea design" rows={7} placeholder='Type Message....' value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className='btn'>Submit</button>
      </form>



    </div>
  )
}

export default MessageForm
