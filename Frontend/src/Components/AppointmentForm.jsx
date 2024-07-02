import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "../Components/AppointmentForm.css"
import { toast } from 'react-toastify'
const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [nic, setNic] = useState("")
  const [dob, setDob] = useState("")
  const [gender, setGender] = useState("")
  const [appointmentDate, setAppointmentDate] = useState("")
  const [department, setDepartment] = useState("")
  const [doctorFirstName, setDoctorFirstName] = useState("")
  const [doctorLastName, setDoctorLastName] = useState("")
  const [address, setAddress] = useState("")
  const [hasVisited, setHasvisited] = useState("")

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
      console.log(data.doctors);
    };
    fetchDoctors();
  }, []);
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "/api/v1/appointment/appointment/create",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstname: doctorFirstName,
          doctor_lastname: doctorLastName,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setNic(""),
        setDob(""),
        setGender(""),
        setAppointmentDate(""),
        setDepartment(""),
        setDoctorFirstName(""),
        setDoctorLastName(""),
        setHasvisited(""),
        setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div>
      <div className="appointhead">
        <h2>Appointment</h2>
        <h3>Please Get Appointment Here To Continue</h3>
      </div>
      <p style={{marginLeft:280}}>Lorem ipsum dolor, sit  libero quo dolorum exercitationem alias non ducimus sunt molestias, quis,sit  libero quo dolorum exercitationem alias non ducimus sunt molestias, excepturi optio recusandae.</p>
      <div>
        <form onSubmit={handleAppointment} action="">
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
          <input className="field design" type='date' placeholder='Appointment DAte' value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
          <div style={{marginLeft:80}}>
            <select className="field design"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctorFirstName("");
                setDoctorLastName("");
              }}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
            <select className="field design"
              value={`${doctorFirstName} ${doctorLastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setDoctorFirstName(firstName);
                setDoctorLastName(lastName);
              }}
            //disabled={!department}
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartment === department)
                .map((doctor, index) => (
                  <option
                    value={`${doctor.firstName} ${doctor.lastName}`}
                    key={index}
                  >
                    {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
            </select>
            <textarea style={{ height: 200, width: 1050 }} className="field design" placeholder='Address' rows="10" value={address} onChange={(e) => setAddress(e.target.value)} />
            <p >Have you visited before? <input type="checkbox" checked={hasVisited} onChange={(e) => setHasvisited(e.target.checked)} /></p>



          </div>
          <button className='registerbtn' type='submit'>GET APPOINTMENT</button>
        </form>
      </div>
    </div>
  )
}

export default AppointmentForm
