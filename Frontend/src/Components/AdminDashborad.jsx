import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors", error);
    }
  };

  const deleteDoctor = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(`http://localhost:5000/api/doctors/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        fetchDoctors();
      } catch (error) {
        console.error("Error deleting doctor", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
      <Link to="/add-doctor" className="bg-blue-500 text-white px-4 py-2 rounded mb-3">Add Doctor</Link>
      <table className="w-full mt-5 border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Specialization</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id} className="border">
              <td className="border p-2">{doctor.firstName} {doctor.lastName}</td>
              <td className="border p-2">{doctor.doctorDepartment}</td>
              <td className="border p-2">
                <Link to={`/edit-doctor/${doctor._id}`} className="text-blue-500 mr-2">Edit</Link>
                <button onClick={() => deleteDoctor(doctor._id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
