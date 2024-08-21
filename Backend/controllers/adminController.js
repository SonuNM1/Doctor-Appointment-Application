
const doctorModel = require("../models/doctorModel") ;  // 'Doctor' collection in the database
const userModel = require("../models/userModels") ;     // 'User' collection in the database


// GET all users from the database 

const getAllUsersController = async (req, res) => {
    try{

        /* Step 1: Fetch all users from the database using the userModel.
        The find ({}) method with an empty object as a parameter retrieves all documents 
        */

        const users = await userModel.find({}) ; 

        // If the fetch is successful, send a success response with the data

        res.status(200).send({
            success: true,  // indicates the operation was successful 
            message: "Users data List",  // a message describing the response
            data: users,    // the actual user fetched from the database 
        })
    } catch(error){
        console.log(error) ; 
        res.status(500).send({
            success: false, 
            message: "Error while fetching users",
            error
        })
    }
}

// GET doctors from the database 

const getAllDoctorsController = async (req, res) => {
    try{
        const doctors = await doctorModel.find({}) ; 

        res.status(200).send({
            success: true, 
            message: "Doctors Data List",
            data: doctors
        })
    }catch(error){
        console.log(error) ; 
        res.status(500).send({
            success: false,
            message: "Error while getting doctors data",
            error
        })
    }
}


// Doctor Account status - This controller allows an admin to update the status of a doctor account request (approve or reject). Ensures that the related user's account reflects this change, both by updating the 'isDoctor' and notifying the user of the change. 


const changeAccountStatusController = async (req, res) => {

    try{

        const {doctorId, status} = req.body ;   // extracting doctorId and status from the request body 

        // Find the doctor by their ID and update their status in the database 

        const doctor = await doctorModel.findByIdAndUpdate(doctorId, {status }) ; 

        // Find the user associated with this doctor 

        const user = await userModel.findOne({_id: doctor.userId})

        // Get the user's current notifications 

        const notification = user.notification ; 

        // Add a new notification to the user's notification list 

        notification.push({
            type: 'doctor-account-request-updated',     // type of notification 
            message: `Your Doctor Account Request has been: ${status}` ,      // the message to be displayed 
            onClickPath: '/notification'    // path to be redirected when the notification is clicked 
        })

        // update he user's 'isDoctor' status based on doctor's account status 

        user.isDoctor = status === 'approved' ? true : false ;

        await user.save() ;     // save the updated user information in the database 

        // Send a success response back to the client 

        res.status(201).send({
            success: true,
            message: "Account Status Updated",
            data: doctor,   // include the updated doctor data in the response 
        })

    }catch(error){
        console.log(error) ;
        res.status(500).send({
            success: false, 
            message: "Error in Account Status", 
            error
        })
    }
}

module.exports = {
    getAllUsersController,
    getAllDoctorsController,
    changeAccountStatusController
}