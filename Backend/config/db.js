
const mongoose = require("mongoose") ; 
const colors = require("colors") ; 

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL) ; 

        console.log(`Database connected: ${mongoose.connection.host}`.bgGreen.white);
        
    }catch(error){
        console.log(`MongoDB Server Issue: ${error}`.bgRed.white)
    }
}

module.exports = connectDB ; 