
import React, {useState, useEffect} from 'react';
import Layout from "./../../components/Layout" ; 
import axios from "axios" ; 
import { Table } from 'antd';


const Doctors = () => {

  const [doctors, setDoctors] = useState([]) ;  // state to hold the list of doctors 

  // Function to fetch doctor's data from the backend 

  const getDoctors = async ()=>{
    try{
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`    // Sending the token for authentication 
        }
      }) ; 

      // If the request is successful, update the doctors state with the fetched data

      if(res.data.success){
          setDoctors(res.data.data) ; 
      }
    }
    catch(error){
      console.log(error) ; 
    }
  } ;


  /* This function is triggered when the admin clicks on the "Approve" or "Reject" button for a doctor. The goal is to update the doctor's account status (e.g. from 'pending' to 'approved')

    'record' Contains the data for the doctor whose status is being changed (e.g. their 'doctorId', 'userId')

    'status': the new status to e set for the doctor(e.g. 'approved' or 'rejected')
  */

  const handleAccountStatus = async (record, status) => {

    try{

      /*
      'doctorId': The ID of the doctor whose status is being updated

      'userId': The user ID associated with the doctor
      
      'status': The new status to apply to the doctor (passed as a parameter to the function)
      */

      const res = await axios.post('/api/v1/admin/changeAccountStatus', {
        doctorId: record._id, userId: record.userId, status: status}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })

      if(res.data.success){
        message.success(res.data.message) ;   // displays a success message to the user using Ant design's message component 
        window.location.reload() ; // reloads the current page to reflect the updated status in the UI.
      }

    }catch(error){
      message.error('Something went wrong') ; 
    }
  } 

  // Fetch doctors when the component mounts (i.e. when it first loads)

  useEffect(()=> {
    getDoctors() ; 
  },[])   // empty dependency array ensures it runs only once 


                // Ant Design (antd) & Table Configurations 

  const columns = [
    {
      title: "Name",
      dataIndex: 'name',
      render: (text, record) => {
        <span>{record.firstName} {record.lastName}</span>
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'phone',
      dataIndex: 'phone'
    },
    {
      title: "Actions",
      dataIndex: 'actions',
      render: (text, record)=>{
        <div className='d-flex'>

        {/*Conditional Rendering. 
        
        If 'record.status' is 'pending', it means the doctor's status is still awaiting approval. In this case, the 'render' function returns a green "Approve" button. 
        
        If 'record.status' is anything other than 'pending' (e.g. 'approved' or 'rejected'), the 'render' function returns a red 'Reject' button. 
        */}

            {record.status === 'pending' ? <button className='btn btn-success'
            onClick={() => handleAccountStatus(record, 'approved')}
            >Approve</button> : <button className='btn btn-danger'>Reject</button> }
        </div>
      }
    }
  ]

  return (
    <Layout>
        <h1 className='text-center m-3'>All Doctors</h1>
        <Table columns={columns} dataSource={doctors} />
    </Layout>
  )
}

export default Doctors