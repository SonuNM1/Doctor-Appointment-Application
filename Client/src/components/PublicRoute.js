
import React from "react" ; 
import { Navigate } from "react-router-dom";

export default function PublicRoute({children}){

    // Check if the user is authenticated by checking if a token exists in localStorage

    if(localStorage.getItem("token")){

        // If the user is authenticated, redirect them to the homepage or another protected route

        return <Navigate to="/"/>   
    }
    else{
        return children ; // if the user is not authenticated, allow them to see the public route 
    }
}


/*

Creating a 'PublicRoute' is useful for preventing users who are already authenticated (i.e. already logged in) from accessing routes like login or registration. 

If a user tries to access these routes while they're logged in, they should be redirected to the home page or another protected route. 

- Similar to 'ProtectedRoute', 'PublicRoute' also takes 'children' as a prop. 

- The logic here is inverted compared to 'ProtectedRoute'


*/