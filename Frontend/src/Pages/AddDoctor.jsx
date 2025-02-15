import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addDoctor } from "../services/doctorSDervices";
import "../Pages/AddDoctor.css"; // Reusing Register Page Styles

const AddDoctor = () => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userId");
    const [doctor, setDoctor] = useState({
        name: "",
        specialization: "",
        experience: "",
        availability: "",
        fees: "",
        userid
    });

    // console.log("token::::", token);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setDoctor({ ...doctor, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoctor(doctor, token);
            toast.success("Doctor added successfully!");
            navigate("/doctors");
        } catch (error) {
            console.error("Error adding doctor:", error);
            toast.error("Failed to add doctor. Try again!");
        }
    };

    return (
        <div>
            <div className="doctor">
                <h2>Add Doctor</h2>
                <h3>Fill the details below</h3>
            </div>

            <div className="addDoctor">
                <form onSubmit={handleSubmit}>
                    <input
                        className="field design"
                        type="text"
                        placeholder="Doctor Name"
                        name="name"
                        value={doctor.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="field design"
                        type="text"
                        placeholder="Specialization"
                        name="specialization"
                        value={doctor.specialization}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="field design"
                        type="number"
                        placeholder="Experience (Years)"
                        name="experience"
                        value={doctor.experience}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="field design"
                        type="text"
                        placeholder="Availability (e.g., Mon-Fri 9AM-5PM)"
                        name="availability"
                        value={doctor.availability}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="field design"
                        type="number"
                        placeholder="Fees ($)"
                        name="fees"
                        value={doctor.fees}
                        onChange={handleChange}
                        required
                    />

                    <div>
                        <br />
                        <button className="addDoctorbtn" style={{ marginRight: 120 }} type="submit">
                            Add Doctor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;
