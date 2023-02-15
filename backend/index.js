const express= require("express")
const cors=require("cors")
require("dotenv").config();
const {connection} = require("./config/db");
const { userRoutes } = require("./Routes/user.routes");
const { chatRoutes } = require("./Routes/chat.routes");
const { authentication } = require("./Middlewares/authentication");
const { messageRoutes } = require("./Routes/message.routes");
const PORT=process.env.PORT || 8000

const app=express();
app.use(express.json())
app.use(cors())  

 
app.get("/",(req,res)=>{
    res.send({message:"API is working"})
})

app.use("/user",userRoutes)
app.use("/chat",authentication,chatRoutes)
app.use("/message",authentication,messageRoutes)


const server =app.listen(PORT,async()=>{
    try {
        await connection;
        console.log("connected to db");
      } catch (err) {
        console.log("connection error");
        console.log(err);
      }
    
      console.log("server running at " + PORT);
})

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});


io.on("connection",(socket)=>{
  // socket.on("conn",()=>{
    console.log("conneded to socket.io")
  // })

  socket.on("newSocket",(userData)=>{
    socket.join(userData.id);
    socket.emit("connected")
  })

  socket.on("joinchat",(room)=>{
    socket.join(room);
    console.log("user join room "+ room)

  })
  

})
