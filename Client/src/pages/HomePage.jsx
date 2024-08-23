
import React, {useState, useEffect} from 'react'
import axios from "axios" ; 
import Layout from '../components/Layout';
import { Row } from 'antd';
import DoctorList from '../components/DoctorList';

const HomePage = () => {

  const [doctors, setDoctors] = useState([]) ; // store list of doctors fetched from the database 

  // login user data - fetch the user's data from the backend. This function is invoked inside the useEffect, meaning it will be called as soon as the 'HomePage' component is mounted. 

  const getUserData = async ()=>{
    try{

      // Make a GET request to the backend endpoint to fetch the list of approved doctors

      const res = await axios.get('/api/v1/user/getAllDoctors', {
        headers: {

          // Attach the JWT token from localStorage in the Authorization header

          Authorization: "Bearer " + localStorage.getItem('token') 
        }
      } ) ; 

      // If the req is successful, the doctor's data is stored in the 'doctors' state 

      if(res.data.success){
        setDoctors(res.data.data) ; 
      }

    }catch(error){  
      console.log(error);
      
    }
  }

  // This hook triggers the 'getUserData' function when the 'HomePage' component mounts, fetching the doctor's list 

  useEffect(()=>{
      getUserData() ; 
  }, [])

  return (

    /* Wrapping the homepage with 'Layout' that includes the sidebar, header, etc is consistently applied across different pages, including the 'HomePage' */

    // The list of doctors is mapped to individual 'DoctorList' components. Each doctor is passed as a prop to 'DoctorList'

    <Layout>
      <h1 className='text-center' >Home Page</h1>
      <Row>
        {
          doctors && doctors.map(doctor => {
            <DoctorList doctor={doctor} />
          })
        }
      </Row>
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