const mongoose=require("mongoose");
const express=require("express");
const pinRoute=require("./routes/pin")
const userRoute=require("./routes/users")
const dotenv=require("dotenv");
const cors=require("cors")
mongoose.set('strictQuery', true);


const app=express();
dotenv.config();
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Mongoose connected!!")
})
.catch((err)=>{
    console.log(err)
})

app.use("/api/pins",pinRoute)
app.use("/api/users",userRoute)



app.listen(process.env.PORT||5000,()=>{
    console.log("RUNNING ON PORT 5000!!!!")
})