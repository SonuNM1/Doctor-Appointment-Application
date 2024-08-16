import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading} from "../redux/features/alertSlice";
import '../styles/RegisterStyles.css' ; 
import {Link, useNavigate} from 'react-router-dom' ;
import axios from "axios" ; 

// Login form handler - Send the login data to the backend and handle the response 

const Login = () => {

  const dispatch = new useDispatch() ;
  const navigate = useNavigate() ; 

  // When the user submits the login form, capture the form data (email, password) using the 'onFinish' handler

  const onfinishHandler = async (values) => {
   // console.log(values); 

    try{

      dispatch(showLoading()) ; 

      // Send POST request to the backend login endpoint 

      const res = await axios.post('/api/v1/user/login', values) ;

      window.location.reload() ;    // reloads the current page 

      dispatch(hideLoading()) ;

      // Check if login was successful 

      if(res.data.success){
        localStorage.setItem("token", res.data.token) ; // Store the jwt token in localstorage 
        message.success('Login successfully') ; 
        navigate('/') ; // redirect to the homepage 
      }
      else{
        message.error(res.data.message) ; 
      }

    }catch(error){
      dispatch(hideLoading()) ;
      console.log(error);
      message.error('Something went wrong') ; 
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

          <h3 className="text-center">Login Page</h3>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          
          <Link 
          to='/register'
          className="m-2 "
          >Don't have an account? Create your account</Link>

          <button className="btn btn-primary" type="submit">Login</button>

        </Form>
      </div>
    </>
  );
};

export default Login;



/*

The  Login.jsx component 

- captures the user's login data, 
- sends it to the backend for authentication, and 
- handles the response appropriately. 
- If the login is successful, the JWT token is stored for future requests, and 
- the user is redirected to a protected route (e.g., the dashboard/homepage).

*/