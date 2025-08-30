const mongoose=require("mongoose")
const mongoDB=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('MongoDB Connected Successfully');
    })
    .catch((err)=>{
        console.log(err.message);
    })
}
module.exports=mongoDB