
/*
The 'BookingPage' component is designed to allow users to book appointment with doctors. It fetches the doctor's details based on the 'doctorId' from the URL parameters and allows the users to select a date and time for the appointment. The user can then check the availability of the doctor for selected time. 
*/

import React, {useState, useEffect}from 'react'
import Layout from '../components/Layout' ; 
import {useParams} from "react-router-dom" ; 
import axios from "axios" ; 
import { DatePicker, TimePicker } from 'antd';
import {useDispatch} from "react-redux" ; 
import moment from "moment" ; 
import {showLoading, hideLoading} from '../redux/features/alertSlice' ; 


const BookingPage = () => {

    const {user} = useSelector(state => state.user) ; 

    const [doctors, setDoctors] = useState([]) ;    // state to store the doctor's details 
    const [date, setDate] = useState() ;        // state to store the selected date 
    const [time, setTime] = useState() ;  // state to store the selected time range 
    const [isAvailable, setIsAvailable] = useState() ;  // state to store the availability status 

    const dispatch = useDispatch() ; 

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


    // ****************** Book appointment function 


    const handleBooking = async () => {
        try{
            dispatch(showLoading()) ; // dispatch an action to show a loading spinner/indicator

            // Send a POST req to the server to book an appointment

            const res = await axios.post('/api/v1/user/book-appointment', {
                doctorId: params.doctorId,  // Id of the doctor being booked 
                userId: user._id,   // Iid of the user making the booking 
                doctorInfo: doctors,    // information about the doctor (name, specialization)
                date: date, // selected date for the appointment 
                userInfo: user, // information about the user (name, contact details)
                time: time // selected time for appointment 
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            dispatch(hideLoading()) ; 

            // if the booking is successful, show a success message to the user 

            if(res.data.success){
                message.success(res.data.message)
            }

        }catch(error){
            dispatch(hideLoading())
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

                            <TimePicker  format="HH:mm"
                            className="m-2"
                            onChange={(value) => setTime(moment(value).format("HH:mm"))}    
                            />

                            {/*Button to check the availability of the doctor*/}

                            <button
                            className="btn btn-primary mt-2"
                            >Check Availability</button>

                            <button
                            className="btn btn-dark mt-2"
                            onClick={handleBooking}
                            >Book Now</button>
                        </div>

                    </div>
                )
            }
        </div>
    </Layout>
  )
}

export default BookingPage