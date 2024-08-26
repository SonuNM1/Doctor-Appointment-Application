
const express = require("express") ;
const authMiddleware = require("../middleware/authMiddleware") ; 
const {getDoctorInfoController,
     updateProfileController, 
     getDoctorByIdController, 
     doctorAppointmentController, 
     updateStatusController} = require("../controllers/doctorController");
const router = express.Router() ; 


// POST individual doctor profile 

router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController) ; 

// POST update profile 

router.post('/updateProfile', authMiddleware, updateProfileController) ; 


// POST - get single doctor infor 

router.post('/getDoctorById', authMiddleware, getDoctorByIdController)


// GET - Appointments 

router.get('/doctor-appointments', authMiddleware, doctorAppointmentController)

// POST update status 

router.post('/update-status', authMiddleware, updateStatusController)

module.exports = router ; 