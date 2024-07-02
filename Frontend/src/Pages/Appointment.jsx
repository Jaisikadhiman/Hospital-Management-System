import React from 'react'
import Hero from "../Components/Hero.jsx"
import AppointmentForm from "../Components/AppointmentForm.jsx"
const Appointment = () => {
  return (
    <div>
    <Hero title={"Schedule Your Appointment \ Jass Care Medicale Institute"} imageUrl={"../../public/aboutt.jpg"} />
      <AppointmentForm />
    </div>
  )
}

export default Appointment
