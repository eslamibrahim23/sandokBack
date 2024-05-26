const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const app=express();
const PORT = process.env.PORT || 5000;
const connect=require('./database/connectToDB');

app.use(express.json());
const cors = require("cors")
app.use(cors());

const authRoute=require("./routes/authRoute");
const clientRoute=require("./routes/clientRoute");


app.use('/auth',authRoute);
app.use('/client',clientRoute);


app.get("/test",(req,res)=>{
    res.json({
        message:"hello"
    });
})

connect();
app.listen(PORT,()=>{
    console.log(PORT,"server is running..")
})

