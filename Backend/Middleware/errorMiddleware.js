class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
    }
    
    export const errorMiddleware=(err,req,resp,next)=>{
        err.message=err.message||"Internal server error"
        err.statusCode=err.statusCode||500
    
        if(err.statusCode===11000){
            const message= `Duplicate ${Object.keys(err.keyValue)} entered`
            err=new ErrorHandler(message,400)
        }
        if(err.name==="JsonWebTokenError"){
            const message= "json web token is invalid,Try again"
            err=new ErrorHandler(message,400)
        }
        if(err.name==="TokenExpireError"){
            const message= "json web token is expired,Try again"
            err=new ErrorHandler(message,400)
        }
        if(err.name==="CastError"){
            const message= `Invalid ${err.path}`
            err=new ErrorHandler(message,400)
        }
        const errormessage=err.errors?Object.values(err.errors).map(error=>error.message).join(" "):err.message
        return resp.status(err.statusCode).json({
            success:false,
            message:errormessage
        })
    }
    export default ErrorHandler;