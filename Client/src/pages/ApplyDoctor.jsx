
import React from "react";
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission when applying for a doctor account

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading()); // loading indicator. Inform the user that a process is currently running

      /* Making a POST request to the server to apply for a doctor account 
         The values from the form are spread into the request body along with the userId
      */

      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        {
          ...values,    // spreading the form values (fistName, lastName, etc)
          userId: user._id,   // including the userId of currently authenticated user 
        },

        // including the authorization header with the brearer token
        
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,   
          },
        }
      );

      // dispatch an action to hide the loading indicator after the req. is complete 

      dispatch(hideLoading());

      // Check if reponse from the server indicates success 

      if (res.data.success) {
        message.success(res.data.message);    // if success, display a success message to the user
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());      // hide loading indicator if there's an error
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h6>Personal Details</h6>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstname"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter your first name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastname"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter your last name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone no"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter your phone no" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter your email" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Website"
              name="website"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter your website" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter your address" />
            </Form.Item>
          </Col>
        </Row>

        <h6>Professional Details</h6>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your specialization here" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter your experience (in yrs)" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fee"
              name="feesPerConsultation"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter your consultation fee" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Work timing" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;

/*

The '<Col>' component is used in conjunction with the '<Row>' component to create a grid layout. This grid system is used to make our webpages responsive, i.e. they adjust nicely to different screen sizes (like mobile, tablet, or desktop). 

Grid Layout - The screen is divided into a grid with 24 columns. We can use these columns to decide how much space a certain element should take up on different screen sizes. 

  '<Row>' is like a container for columns, and it helps to align multiple columns side by side 

  '<Col>' defines how much of the row a certain element should occupy 


<Col xs={24} md={24} lg={8}>


* xs={24} 

    'xs' stands for extra small devices, like mobile phones. 

    '24' means the element will take up the entire window (100% width) on small screens. 

*md={24}

    'md' stands for medium-sized devices, like tablets 

    '24' means the element will still take up the entire row (100% width) on medium screens 

*lg={8}

    'lg' stands fro large devices, like desktops. 

    '8' means the element will take up 8 out of 24 columns (about 1/3 of the row) on large screens 


    
Responsive Design - The idea is that on smaller screens (like phones), each form field will stack vertically (taking the full width of the screen). On larger screens (like desktops), we can have multiple form fields side by side. This improves the user experience by making the form easier to fill out on all devices. 


Example Visualization: 

- On Mobile (xs=24)

    [Firt Name Field]
    [Last Name Field]
    [Phone Number Field]
    ....


- On Desktop (lg=8)

    [First Name Field] [Last Name Field] [Phone Number Field]


*/
