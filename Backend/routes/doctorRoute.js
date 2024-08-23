
const express = require("express") ;
const authMiddleware = require("../middleware/authMiddleware") ; 
const {getDoctorInfoController, updateProfileController, getDoctorByIdController} = require("../controllers/doctorController");
const router = express.Router() ; 


// POST individual doctor profile 

router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController) ; 

// POST update profile 

router.post('/updateProfile', authMiddleware, updateProfileController) ; 


// POST - get single doctor infor 

router.post('/getDoctorById', authMiddleware, getDoctorByIdController)

module.exports = router ; 