
const doctorModel = require("../models/doctorModel") ; 
const appointmentModel = require("../models/appointmentModel") ; 
const userModel = require("../models/userModels") ; 

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


const doctorAppointmentController = async (req, res) => {
    try{
        const doctor = await doctorModel.findOne({userId:req.body.userId}) ; 

        const appointments = await appointmentModel.find({
            doctorId: doctor._id
        })

        res.status(200).send({
            success: true,
            message: "Doctor appointments fetched successfully",
            data: appointments 
        })

    }catch(error){
        console.log(error) ; 
        res.status(500).send({
            success: false,
            error,
            message:"Error in doctor appointment"
        })
    }
}


const updateStatusController = async (req, res) => {
    try{
        const {appointmentsId, status} = req.body ; 

        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId, {status}) ; 
        
        const user = await userModel.findOne({
            _id: appointments.userId
        }) ;

        const notification = user.notification; 

        notification.push({
            type:'status-updated',
            message:`Your appointment has been updated ${status}`,
            onClickPath:'/doctor-appointments'
        })

        await user.save(); 

        res.status(200).send({
            success: true,
            message: "Appointment status updated "
        })

    }catch(error){
        console.log(error) ; 
        res.status(500).send({
            success:false,
            error,
            message: "Error in updating the status"
        })
    }
}

module.exports = {getDoctorInfoController, updateProfileController,
getDoctorByIdController,
doctorAppointmentController,
updateStatusController
} ; 