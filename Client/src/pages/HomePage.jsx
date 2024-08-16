
import React, {useEffect} from 'react'
import axios from "axios" ; 
import Layout from '../components/Layout';

const HomePage = () => {

  // login user data - fetch the user's data from the backend. This function is invoked inside the useEffect, meaning it will be called as soon as the 'HomePage' component is mounted. 

  const getUserData = async ()=>{
    try{

      // Make a POST request to the backend endpoint to get the user data

      const res = await axios.post('/api/v1/user/getUserData', {}, {
        headers: {

          // Attach the JWT token from localStorage in the Authorization header

          Authorization: "Bearer " + localStorage.getItem('token') 
        }
      } )

    }catch(error){  
      console.log(error);
      
    }
  }

  useEffect(()=>{
      getUserData() ; 
  }, [])

  return (

    {/* Wrapping the homepage with 'Layout' that includes the sidebar, header, etc is consistently applied across different pages, including the 'HomePage' */}

    <Layout>
      <h1>Home Page</h1>
    </Layout>
  )
}

export default HomePage



/*

- When a user logs in, they receive a JWT from the server

- This token is stored on the client-side, typically in 'localStorage' or 'sessionStorage'

- The token is sued to authenticaate future requests to the server, ensuring that only authorized users can access certain resources 

* Fetching User Data : 

- The 'getUserData' function is designed to fetch data related to the logged-in user 

- Th uses 'axios.post' to make a POST request to the backend endpoint api/v1/user/getUserData

- The endpoint is responsible for returning information like the user's name, email, and other profile details 

*/