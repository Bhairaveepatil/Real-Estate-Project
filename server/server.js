const express = require("express"); 
const mongoose = require ("mongoose");
const userController = require ("./user/routes/signupRoute");
const app = express();
const signuploginController = require ("./user/routes/userRoutes")
const cors = require("cors")
require('dotenv').config();
//starting the server
app.listen (3001, (err)=>{
  if (!err){
    console.log("Server started at port 3001")
  }else{
    console.log(err)
  }
});

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//app.use(multer.array())
app.use(cors());

mongoose.connect("mongodb://localhost/realEstate" , (data) => {
  console.log("Successfully connected to db")
}, (err)=>{
    console.log(err)
})

app.get("/",(req, res)=>{
  res.send("Real estate Application (backend)")
})

//middleware
app.use("/user" , userController);
app.use("/userRoutes", signuploginController);
