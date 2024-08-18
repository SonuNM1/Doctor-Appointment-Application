
const userModel = require('../models/userModels') ; 
const bcrypt = require("bcrypt") ; 
const jwt = require("jsonwebtoken") ; 
const doctorModel = require("../models/doctorModel") ; 


// Register callback

const registerController = async (req, res)=>{

    try{

        // Step 1: Check if the user already exists in the database using the provided email

        const existingUser = await userModel.findOne({email: req.body.email}) ;
        
        // Step 2: If the user already exists, return a response indicating that registration cannot proceed 

        if(existingUser){
            return res.status(200).send({
                message: 'User already exist',  // Inform the client that the user already exists 
                success: false      // indicate that the registration wasn't successful 
            }) ; 
        }

        // Step 3: extracting the password from the request body 

        const password = req.body.password ;        

        // Step 4: Generating the salt for hashing the password (the higher the number, the stronger the password)

        const salt = await bcrypt.genSalt(10) ;     

        // Step 5: Hash the password using the generated salt 

        const hashedPassword = await bcrypt.hash(password, salt) ;  

        // replacing the plain text password in the request body with the hashed password 

        req.body.password = hashedPassword ; 

        // Step 6: Creating a new user object 

        const newUser = new userModel(req.body) ;   

        // Step 7: Save the new user to the database 

        await newUser.save() ; 

        // Step 8: Send a response back to the client indicating that the registration was success

        res.status(201).send({
            message: 'Registration successfully', 
            success: true
        }) ; 

    }catch(error){
        console.log(error) ; 

        // Sending response back to the client with the error message (including the error message for debugging)

        res.status(500).send({
            success: false, 
            message: `Register Controller: ${error.message}`
        }) ; 
    }

}

                            // LOGIN HANDLER - using JWT

const loginController = async (req, res)=>{
    try{

        const user = await userModel.findOne({email: req.body.email}) ; 

        if(!user){
            return res.status(200).send({message: 'User not found', success: false})
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password) ; 

        if(!isMatch){
            return res.status(200).send({message: 'Invalid Email or Password', success: false})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'}) ; 

        res.status(200).send({message: 'Login Success', success:true, token}) ; 


    }catch(error){
        console.log(error) ; 
        res.status(500).send({message: `Error in login controller: ${error.message}`})
    }
}

// Fetching user data based on the authenticated user's ID, which is passed in the request body. The function checks whether the user exists in the database and, if found, returns the user's name and email. 


const authController = async (req, res)=>{
    try{

        // Step 1: Retrieve the user from the database using the user ID from the request body 

        const user = await userModel.findById({_id: req.body.userId}) ;

        user.password = undefined ; 

        // Step 2: Check if the user exists 

        if(!user){
            return res.status(200).send({

                // If the user is not found, send a response indicating failure 

                message: "User not found",  // inform the client that the user doesn't exist 
                success: false
            })
        }
        else{

        // Step 3: If the user exists, send the user's data (name and email) back to the client 

            res.status(200).send({
                success: true,
                data: user
            })
        }

    }catch(error){
        console.log(error);
        res.status(500).send({
            message: 'Auth error',
            success: false,
            error
        })
    }
}



/* Apply Doctor Controller - process for a user applying for a doctor account on our application. The controller handles 
                            creating a new doctor entry in the database and notifying the admin about the new application request                          
*/

const applyDoctorController = async (req, res)=>{
    try{

        // Creating a new doctor entry

       const newDoctor = await doctorModel({
        ...req.body,    // Spread the incoming req body to include all the submitted fields (like name, email, etc)
        status:'pending' // default status 'pending'
    })

       await newDoctor.save() ;     // save the new doctor entry to the database 

       // Finding an admin user to notify

       const adminUser = await usrModel.findOne({isAdmin: true}); 

        // Retrieve the admin user's notification array 

       const notification = adminUser.notification  ; 

        // Adding a new notification to the admin's notification array 

       notification.push({
        type: 'apply-doctor-request',   // type of notification
        message: `${newDoctor.firstName} ${newDoctor.lastNname} has applied for a Doctor account`,      
        data: {
            doctorId: newDoctor._id,      // Include the doctor's ID in the notification data 
            name: newDoctor.firstName + " " + newDoctor.lastName,       // include the doctor's fullname
            onClickPath: '/admin/doctors'   // Path the admin should visit when clicking on the notification
        }
       })

       // updating the admin user's notifications in the database 

       await userModel.findByIdAndUpdate(adminUser._id, {notification}) ; 

       // Sending a response back to the client indicating success 

       res.status(201).send({
        success: true, 
        message: "Doctor Account Applied Successfully"
       })

    }catch(error){
        console.log(error) ; 
        res.status(500).send({
            success: false,
            error,
            message: "Error while applying for doctor"
        })
    }
}


module.exports = {loginController, registerController, authController, applyDoctorController} ; 



/* 
                                                    USER REGISTRATION LOGIC 

1. Receive user input - Capture the user's registration details like name, email, and password from the request body 

    const {name, email, password} = req.body ; 

2. Check If User Exists in the database: Before creating a new user, check if a user with the same email already exists in the database to prevent duplicate registrations. 

    const existingUser = await userModel.findOne({email}) ; 

    if(existingUser){
        return res.status(400).json({message: "User already exists"})
    }

3. Hash the password: For security, hash the password before storing it in the database 

    const hashedPassword = await bcrypt.hash(password, 10) ; 

4. Create and Save the User: If the user doesn't already exist, create a new user object and save it to the database 

    const newUser = new userModel({
        name, 
        email, 
        password: hashedPassword,
    }) ; 

    await newUser.save() ; 

5. Send a Response: Send a success response back to the client. If any error occurs, send an appropriate error response. 

    res.status(201).json({message: "User registered successfully", user: newUser})

*/


/*
                LOGIN USING JWT PROCESS & LOGIC 
                

1. Receive login request: The client sends a login request with the user's email and password in the request body 

2. Check if User exists: The server checks if the user with the provided email exists in the database 

3. Verify password: If the user exists, compare the provided password with the stored hashed password using bcrypt 

4. Generate JWT Token: If the password is corre,t generate a JWT token. This token will be used by the client for authenticated requests 

5. Send a response back to the client with the JWT token and a success message if the login is successful, or an error message if it fails. 



*/