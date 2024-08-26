import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Row } from 'antd';
import DoctorList from '../components/DoctorList';

const HomePage = () => {
  const [doctors, setDoctors] = useState([]); // Store list of doctors fetched from the database
  const [error, setError] = useState(null); // State to store error messages

  // Fetch the list of approved doctors from the backend
  const getUserData = async () => {
    try {
      // Make a GET request to the backend endpoint to fetch the list of approved doctors
      const res = await axios.get('/api/v1/user/getAllDoctors', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token'),
        },
      });

      // If the request is successful, store the doctor's data in the 'doctors' state
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      // Handle error and set error message
      console.log(error);
      setError('Failed to fetch doctors. Please try again later.');
    }
  };

  // Fetch user data when the HomePage component mounts
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1 className='text-center'>Home Page</h1>
      {error && <p className='error-message'>{error}</p>} {/* Display error message if there's an error */}
      <Row>
        {doctors && doctors.map((doctor) => (
          <DoctorList key={doctor.id} doctor={doctor} /> // Added key prop for list rendering
        ))}
      </Row>
    </Layout>
  );
};

export default HomePage;
