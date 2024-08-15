
const userModel = require('../models/userModels') ; 
const bcrypt = require("bcrypt") ; 
const jwt = require("jsonwebtoken") ; 

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

        const user = await userModel.findOne({_id: req.body.userId}) ;

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
                data: {
                    name: user.name,        // including the user's name in the response
                    email: user.email,      // including the user's email in the response 
                }
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


module.exports = {loginController, registerController, authController} ; 



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