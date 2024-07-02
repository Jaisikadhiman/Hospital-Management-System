import mongoose from "mongoose"

const dbConnection =()=>{
mongoose.connect(process.env.MONGO_URL,{
    dbName:"MERN_HOSPITAL_MANAGEMENT"
}).then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log("error while connecting to database")
})
}
export default dbConnection;