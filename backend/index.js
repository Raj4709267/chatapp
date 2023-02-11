const express= require("express")
const cors=require("cors")
require("dotenv").config();
const {connection} = require("./config/db");
const { userRoutes } = require("./Routes/user.routes");
const PORT=process.env.PORT || 8000
const http=require("http")

const app=express();
const httpServer=http.createServer(app)
app.use(express.json())
app.use(cors()) 

app.get("/",(req,res)=>{
    res.send({message:"API is working"})

})

app.use("/user",userRoutes)


httpServer.listen(PORT,async()=>{
    try {
        await connection;
        console.log("connected to db");
      } catch (err) {
        console.log("connection error");
        console.log(err);
      }
    
      console.log("server running at " + PORT);
})