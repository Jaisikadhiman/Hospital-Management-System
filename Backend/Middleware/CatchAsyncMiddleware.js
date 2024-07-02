export const CatchAsyncError=(theFunction)=>{
return (req,resp,next)=>{
    Promise.resolve(theFunction(req,resp,next)).catch(next);
}
}