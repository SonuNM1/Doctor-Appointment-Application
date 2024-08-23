
const doctorModel = require("../models/doctorModel") ; 

// Controller function to fetch doctor information based on the userId

const getDoctorInfoController = async (req, res) => {
    try{

        // Finding a doctor record in the database where the userId matches 

        const doctor = await doctorModel.findOne({userId: req.body.userId}) ; 

        // If the doctor record is found, send a successful response with the doctor's data

        res.status(200).send({
            success: true, 
            message: "Doctor data fetched successfully",
            data: doctor, 
        })

    }catch(error){
        console.log(error) ; 
        res.status(500).send({
            success: false, 
            error,
            message: "Error in Fetching doctor details"
        })
    }
}

// Update Doctor profile 

const updateProfileController = async (req, res)=> {
    try{
        const doctor = await doctorModel.findOneAndUpdate({userId: req.body.userId}, req.body) ; 

        res.status(201).send({
            success: true,
            message: "Doctor Profile Updated",
            data: doctor
        })
    }catch(error){
        console.log(error) ; 
        res.status(500).send({
            success: false, 
            message: "Doctor profile update issue",
            error
        })
    }
}


// get individual doctor 


const getDoctorByIdController = async(req, res)=>{
    try{
        const doctor = await doctorModel.findOne({_id: req.body.doctorId}) ; 

        res.status(200).send({
            success: true, 
            message: "Individual doctor info fetched",
            data: doctor, 
        })
    }catch(error){
        console.log(error) ; 
        res.status(500).send({
            success: false, 
            message: "Error in fetching individual doctor info",
            error
        })
    }
}


module.exports = {getDoctorInfoController, updateProfileController,
getDoctorByIdController
} ; 