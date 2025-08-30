const jwt=require("jsonwebtoken")
const middleawre=async (req,res,next)=>{
   try{
     const token=req.headers["user-token"] 
    if(!token){
        console.log("Token Not Found");
    }
    const tokenVerify=await jwt.verify(token,process.env.SECRET_KEY)
    if(!tokenVerify){
        console.log("Token is invalid");
    }
    req.user=tokenVerify
    next()
   }
   catch(error){
    console.log(error.message);
    
   }
}
module.exports=middleawre