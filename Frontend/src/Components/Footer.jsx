import React from 'react'
import { Link } from 'react-router-dom';
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail, MdHeight } from "react-icons/md";
import logo from "../../public/logo.jpg"
import "../Components/Footer.css"
const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Monday",
      time: "3:00 PM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 3:00 PM",
    },
  ];

  return (
    <>
    <div>
      < hr />
    </div>
      <footer className={"footer"}>
        
        <div className="content">
          
          <div>
            <img style={{ marginLeft: 10, marginTop: 10 }} src={logo} alt="logo" className="logo-img" />

          </div>
          <div className='quick'>
            <h4 style={{ marginLeft: 35 }}>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/appointment"}>Appointment</Link>
              <Link to={"/about"}>About</Link>
            </ul>
          </div>

          <div  style={{ marginLeft: 100 } }>
            <h4 style={{ marginLeft: 40}} >Hours</h4>
            <ul>
              {hours.map((element) => (
                <li key={element.id}>
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>

          
        </div>
        <div style={{ marginLeft: 100 }}>
            <h4>Contact</h4>
            <div>
              <FaPhone />
              <span>000-000-9999</span>
            </div>
            <div>
              <MdEmail />
              <span>Jesscarelab@gmail.com</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>Saharanpur,Uttaer Pradesh</span>
            </div>
          </div>
        
      </footer>
    </>
  );
}

export default Footer
