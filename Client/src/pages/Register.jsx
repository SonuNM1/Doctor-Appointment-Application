import React from "react";
import { Form, Input, message } from "antd";
import '../styles/RegisterStyles.css' ; 
import {Link, useNavigate} from 'react-router-dom' ;
import axios from "axios" ; 
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

// Form handler

const Register = () => {

  const dispatch = useDispatch() ; 

  const navigate = useNavigate() ; // navigate to different routes in our application

  // This function is triggered when the form is successfully submitted . It takes 'value' object as an argument, which contains the data entered by the user in the form fields (name, email, password) . Sending form data to the backend API 

  const onfinishHandler = async (values) => {

  //  console.log(values);  values represents the data collected from the form fields when the form is submitted

  try{

    dispatch(showLoading()) ; 

    // sends an HTTP POST request to the specified URL. The 'values' object is sent as the body of the request, which contains the user's registration data. 

    // This request is sent to to the backend API to register the user. The backend processes this data, saves the new user to the database, and returns a response 

    const res = await axios.post('/api/v1/user/register', values) ; 

    dispatch(hideLoading()) ; 

    if(res.data.success){
      message.success('Registration successfully') ; 
      navigate('/login') ; // After successful registration, redirected to the login page 
    }
    else{
      message.error(res.data.message) ; 
    }
  }catch(error){
    dispatch(hideLoading()) ; 
    console.log(error) ; 
    message.error("Something went wrong")
  }
  };

  return (
    <>
      <div className="form-container">
        <Form 
        layout="vertical" 
        onFinish={onfinishHandler}
        className="register-form"
        >

          <h3 className="text-center">Register Form</h3>

          <Form.Item label="name" name="name">
            <Input type="text" required />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          
          <Link 
          to='/login'
          className="m-2 "
          >Already user? Login here</Link>

          <button className="btn btn-primary" type="submit">Register</button>

        </Form>
      </div>
    </>
  );
};

export default Register;

/*

onFinish - gets triggered when the form is successfully submitted. The 'onFinish' prop expects a function that takes a single argument 'values'

values - it contains all the user input that we need to process when a form is submitted. For instance, we will send this data to backend API to register a new user, book an appointment or perform any other action. 

Form.Item - component provided by Ant Design (antd) that acts as a wrapper for individual form fields. 

name = "name" - it acts as the key in the 'values' object when the form is submitted. Whatever the user enters in this input field will be stored under the key 'name' in the 'values' object 

*/
