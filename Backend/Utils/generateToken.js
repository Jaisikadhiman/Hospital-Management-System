export const generateToken=(user,message,statuscode,resp)=>{
const token = user.generateJsonWebToken();
const cookieName= user.role === "Admin"? "AdminToken":"PatientToken";
resp.status(statuscode).cookie(cookieName,token,{
    expires: new Date(Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000),
    httpOnly:true
}).json({
    success:true,
    message,
    user,
    token
})
}