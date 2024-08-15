
const JWT = require("jsonwebtoken") ; 

// This middleware function will be executed for protected routes 

module.exports = async (req, res, next) => {    
    try{

        // Extract the token from the 'Authorization' header

        const token = req.headers['authorization'].split(' ')[1] ; // Bearer fdjfjau903842ls

        // Verify the token using JWT and the secret key

        JWT.verify(token, process.env.JWT_SECRET, (err, decode)=>{
            
            // If there is an error during verification, respond with an authentication failure 

            if(err){
                return res.status(200).send({
                    message: 'Auth failed',
                    success: false
                })
            }else{
                req.body.userId = decode.id ;   // if the token is valid, attach the user's ID (from the token payload) to the request body
                next() ;    // proceed to the next middleware 
            }
    
        })
    }catch(error){
        console.log(error) ; 
        res.status(401).send({
            message: 'Auth failed',
            success: false
        })
    }
}

// will send token to the client - providing the client with a JWT after a successful authentication, such as during login or registration  

/*

- The requst has body as well as the header

Creating an 'authMiddleware.js' is a common practice for handling JWT authentication and authorinzation. This middleware will be used to protect routes by verifying that the request contains a valid JWT token and, optionally, checking the user's role or permissions. 

- The middleware function will extract the token from the request headers

- It will then verify the token using 'jsonwebtoken'

- If the token is valid, it will decode the token to retrieve user information and attach it to the request object. 

- If the token is invalid/missing, it will return an error response 

- The middleware can be applied to any route that requires the user to be authenticated. (for eg. /profile, /dashboard or any admin routes can use this middleware to ensure only authorized users can access them)



* Token Extraction -  The token is expected to be in the Authorization header of the request. Typically, this header is formatted as "Bearer <token>". The split(' ')[1] part extracts the actual token (i.e., the part after "Bearer ").

* Token Verification - JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {...});

    The JWT.verify method checks if the token is valid by using the secret key stored in process.env.JWT_SECRET. This secret key is used to decode the token and verify its integrity.

    If the token is valid, the decode object will contain the payload of the token, typically including the user's ID and other claims.

* Attaching User ID to the request - 

    req.body.userId = decode.id;

    If the token is successfully verified, the user's ID (extracted from the token's payload) is attached to the req.body. This allows the subsequent route handlers to know which user is making the request.

* Authorization header - is an HTTP header used to pass credentials or other authentication information in HTTP requests. In the context of JWT authentication, the 'Authorization' header typically carries the token needed to authenticate the client making the request. 

    Format - Authorization: Bearer <token>

*/