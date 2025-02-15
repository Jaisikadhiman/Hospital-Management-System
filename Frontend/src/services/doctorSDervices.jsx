import axios from "axios";

const API_URL = "http://localhost:4000/api/doctors"; // Change if needed

export const getDoctors = async () => {
    return await axios.get(`${API_URL}/list`);
};

export const addDoctor = async (doctorData, token) => {
    console.log("token doctor",token);
    console.log("doctorData:::",doctorData);
    const resp= await axios.post(`${API_URL}/add`, doctorData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log("doctor resp:::",resp)
};

export const updateDoctor = async (id, doctorData, token) => {
    return await axios.put(`${API_URL}/update/${id}`, doctorData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteDoctor = async (id, token) => {
    return await axios.delete(`${API_URL}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
