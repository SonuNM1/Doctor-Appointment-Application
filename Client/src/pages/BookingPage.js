
/*
The 'BookingPage' component is designed to allow users to book appointment with doctors. It fetches the doctor's details based on the 'doctorId' from the URL parameters and allows the users to select a date and time for the appointment. The user can then check the availability of the doctor for selected time. 
*/

import React, {useState, useEffect}from 'react'
import Layout from '../components/Layout' ; 
import {useParams} from "react-router-dom" ; 
import axios from "axios" ; 
import { DatePicker, TimePicker } from 'antd';


const BookingPage = () => {

    const [doctors, setDoctors] = useState([]) ;    // state to store the doctor's details 
    const [date, setDate] = useState() ;        // state to store the selected date 
    const [timings, setTimings] = useState() ;  // state to store the selected time range 
    const [isAvailable, setIsAvailable] = useState() ;  // state to store the availability status 

    // retrieving the doctorId from the URL parameters 

    const params = useParams() ; 

    // Function to fetch the doctor's details based on doctorId. This ID is used to fetch the specific doctor's details. 

    const getUserData = async () => {
        try{
            const res = await axios.post("/api/v1/doctor/getDoctorById", {
                doctorId: params.doctorId
            } , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            } ) ; 

            if(res.data.success){
                setDoctors(res.data.data) ; 
            }
        }catch(error){
            console.log(error) ; 
        }
    }

    // useEffect to fetch the doctor's data when the component mounts 

    useEffect(()=>{
        getUserData() ; 
    },[]) ; 

  return (
    <Layout>
        <h3>Booking Page</h3>
        <div className='container m-2'>
            {
                // Render the doctor's details if they are available 

                doctors && (
                    <div>
                        <h4>
                            Dr. {doctors.firstName} {doctors.lastName}
                        </h4>
                        
                        <h4>Fees : {doctors.feesPerConsultation} </h4>
                        
                        <h4>Timing : {doctors.timings[0]} - {doctors.timings[1]} </h4>

                        <div className='d-flex flex-column  w-50' >

                            {/*DatePicker component to select the appointment date*/}

                            <DatePicker
                            className="m-2"
                             format="DD-MM-YYYY"
                            onChange={(value)=> setDate(moment(value).format("DD-MM-YYYY"))}    
                            />

                            {/*TimePicker component to select the appointment time range*/}

                            <TimePicker.RangePicker format="HH:mm"
                            className="m-2"
                            onChange={(values) => setTimings([
                                moment(values[0]).format("HH:mm"),
                                moment(values[1].format("HH:mm"))
                            ])}    
                            />

                            {/*Button to check the availability of the doctor*/}

                            <button
                            className="btn btn-primary mt-2"
                            >Check Availability</button>
                        </div>

                    </div>
                )
            }
        </div>
    </Layout>
  )
}

export default BookingPage