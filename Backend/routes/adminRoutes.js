
const express = require("express") ; 
const authMiddleware = require("../middleware/authMiddleware") ; 
const { 
    getAllUsersController, getAllDoctorsController,
    changeAccountStatusController
} = require("../controllers/adminController");
const router = express.Router() ; 

// GET method || Users 

router.get('/getAllUsers', authMiddleware, getAllUsersController) ; 

// GET method || Doctors 

router.get('/getAllDoctors', authMiddleware, getAllDoctorsController) ;

// POST method || Account Status 

router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController) ; 

module.exports = router ; 