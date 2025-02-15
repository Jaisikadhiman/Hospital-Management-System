import express, { urlencoded } from "express"
import { config } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection, {} from "./connection/dbConnection.js"
import messageRouter from "./Router/messageRouter.js"
import userRoute from "./Router/userRouter.js"
import { errorMiddleware } from "./Middleware/errorMiddleware.js";
import appointmentRouter from "./Router/appointmentRouter.js"
import doctorRoutes from "./Router/doctorRoutes.js"
config({path:"./config/config.env"})

const app=express();
app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    methods:['GET','POST','PUT','DELETE'],
credentials:true
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}));
app.use("/api/v1/message",messageRouter);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/appointment",appointmentRouter)
app.use("/api/doctors", doctorRoutes);
dbConnection();
app.use(errorMiddleware);
export default app;