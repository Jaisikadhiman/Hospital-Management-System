import React, { useEffect, useState } from "react";
import { getDoctors, deleteDoctor } from "../services/doctorSDervices";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await getDoctors();
            setDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this doctor?")) {
            try {
                await deleteDoctor(id, token);
                fetchDoctors(); // Refresh list after deletion
            } catch (error) {
                console.error("Error deleting doctor:", error);
            }
        }
    };

    return (
        <div className="container">
            <h2>Doctor List</h2>
            {userRole === "Admin" && (
                <button onClick={() => navigate("/add-doctor")} className="btn btn-primary">
                    Add Doctor
                </button>
            )}
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Experience</th>
                        <th>Availability</th>
                        <th>Fees</th>
                        {userRole === "Admin" && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doc) => (
                        <tr key={doc._id}>
                            <td>{doc.userId.firstName} {doc.userId.lastName}</td>
                            <td>{doc.specialization}</td>
                            <td>{doc.experience} years</td>
                            <td>{doc.availability}</td>
                            <td>${doc.fees}</td>
                            {userRole === "Admin" && (
                                <td>
                                    <button onClick={() => navigate(`/edit-doctor/${doc._id}`)} className="btn btn-warning btn-sm">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(doc._id)} className="btn btn-danger btn-sm ml-2">
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorList;
