import { CatchAsyncError } from "../Middleware/CatchAsyncMiddleware.js"
import ErrorHandler, { } from "../Middleware/errorMiddleware.js"
import { UserModel } from "../Model/UserSchema.js"
import { appointmentModel } from "../Model/appointmentSchema.js";

export const appointment = CatchAsyncError(async (req, resp, next) => {

    const { firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstname,
        doctor_lastname,
        hasVisited,
        address } = req.body;
    if (!firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !doctor_firstname ||
        !doctor_lastname ||
        !address) {
        return next(new ErrorHandler("Fill all details", 400))
    }
    const isConflict = await UserModel.find({
        firstName: doctor_firstname,
        lastName: doctor_lastname,
        role: "Doctor",
        doctorDepartment: department
    })
    if (isConflict.length === 0) {
        return next(new ErrorHandler("Doctor not found", 400))
    }
    if (isConflict.length > 1) {
        return next(new ErrorHandler("Conflict in name contact throuh phone or email", 400))
    }

    const doctor_id = isConflict[0]._id;
    const patient_id = req.user._id;

    await appointmentModel.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor: {
            firstname: doctor_firstname,
            lastname: doctor_lastname
        },
        patient_id,
        doctor_id,
        hasVisited,
        address
    })
    resp.status(200).json({
        success: true,
        message: "appointment send"
    })
})

export const getAppointmentDetails = CatchAsyncError(async (req, resp, next) => {
    const appointment = await appointmentModel.find();
    if (!appointment) {
        return next(new ErrorHandler("not found details", 400))
    }
    resp.status(200).json({
        success: true,
        message: "get details successfully",
        appointment
    })
})

export const updateDetails = CatchAsyncError(async (req, resp, next) => {
    const { id } = req.params;
    let update = await appointmentModel.findById(id);
    if (!update) {
        return next(new ErrorHandler("appointment not found", 400))
    }
    update = await appointmentModel.findByIdAndUpdate(id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    resp.status(200).json({
        success: true,
        message: "update successfully",
       update
    })
  
})

export const deleteDetails = CatchAsyncError(async (req, resp, next) => {
    const { id } = req.params;
    let dlt = await appointmentModel.findById(id);
    if (!dlt) {
        return next(new ErrorHandler("appointment not found", 400))
    }
 await appointmentModel.deleteOne();
    resp.status(200).json({
        success: true,
        message: "delete successfully",
       
    })
  
})