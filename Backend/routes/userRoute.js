
const express = require("express") ; 
const {
    loginController, 
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDoctorsController,
    bookAppointmentController,
    bookingAvailabilityController,
    userAppointmentController
    } = require("../controllers/userController") ; 
const authMiddleware = require("../middleware/authMiddleware");


// Router object 

const router = express.Router() ; 

// LOGIN || POST 

router.post('/login', loginController) ; 

router.post('/register', registerController) ; 

// Auth || POST 

router.post('/getUserData', authMiddleware, authController)


// Apply Doctor || POST 

router.post('/apply-doctor', authMiddleware, applyDoctorController) ; // The middleware function is used to authenticate the user before they can submit the 'Apply Doctor' form. it ensures that only logged-in users can access this route. If the user is not authenticated, the middleware will block the request. 

// Notification Doctor || POST 

/*
The goal is to ensure that when certain actions occur (like a doctor applying for an account), an admin user receives a notification. 
*/

router.post('/get-all-notification', authMiddleware, getAllNotificationController) ; 


// Delete Notification || POST 

router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController) ; 


// GET all doctors - fetching the list of doctors from the database 


router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)


// Book Appointment 

router.post('/book-appointment', authMiddleware, bookAppointmentController) ; 


// Booking Availability 

router.post('/booking-availability', authMiddleware, bookingAvailabilityController)


// Appointment list 

router.post('/user-appointment', authMiddleware, userAppointmentController) ; 

module.exports = router ; 
/*

- Middleware functions are used to process requests before they reach the actual route handler. 

- The 'authMiddleware' is responsible for checking the JWT token in the 'Authorization' header of the request

- It ensures that the request is authenticated. If the token is valid, the request is allowed to proceed to the next step (the 'authController')

- If the token is invalid or missing, the middleware will block the request and send an error response back to the client. 

- If the 'authMiddleware' successfully validates the token, the request is passed to the 'authController'

- The 'authController' is the actual route handler that processes the request

- In this context, 'authController' would fetch and return the user data associated with the authenticated user. 

*/