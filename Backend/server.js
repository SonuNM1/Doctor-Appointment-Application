
const express = require("express") ; 
const colors = require("colors") ; 
const morgan = require("morgan") ; 
const connectDB = require("./config/db");
const dotenv = require("dotenv").config() ; 

const app = express() ;

// mongodb connection

connectDB() ; 

// middlewares

app.use(express.json()) ; 
app.use(morgan('dev')) ;

// routes 

app.use('/api/v1/user', require('./routes/userRoute')) ; 

const port = process.env.PORT || 8080 ; 

// listen port 

app.listen(port, ()=>{
    console.log(`Server running in ${process.env.NODE_MODE} Mode on port ${port}`);
})

