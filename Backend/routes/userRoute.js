
const express = require("express") ; 
const {
    loginController, 
    registerController,
    authController
    } = require("../controllers/userController") ; 
const authMiddleware = require("../middleware/authMiddleware");


// Router object 

const router = express.Router() ; 

// LOGIN || POST 

router.post('/login', loginController) ; 

router.post('/register', registerController) ; 

// Auth || POST 

router.post('/getUserData', authMiddleware, authController)

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