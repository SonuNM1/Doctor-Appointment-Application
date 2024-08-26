import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { showLoading, hideLoading } from "../../../redux/features/alertSlice";
import moment from "moment" ; 


const Profile = () => {
    const { user } = useSelector(state => state.user); // Get the current user from Redux state
    const [doctor, setDoctor] = useState(null); // State to hold doctor data
    const dispatch = useDispatch(); // Hook to dispatch actions to Redux store
    const navigate = useNavigate(); // Hook to navigate between routes
    const params = useParams(); // Hook to get URL parameters

    // Form submit handler function to update doctor profile


    const handleFinish = async (values) => {
        try {
            dispatch(showLoading()); // Show loading spinner
            
            const res = await axios.post(
                "/api/v1/doctor/updateProfile",
                { ...values, userId: user._id, 
                    timings: [
                    moment(values.timings[0]).format("HH:mm"),
                    moment(values.timings[1]).format("HH:mm")
                ] }, // Send form data along with user ID
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header with JWT token
                    },
                }
            );

            dispatch(hideLoading()); // Hide loading spinner

            if (res.data.success) {
                message.success(res.data.message); // Show success message
                navigate("/"); // Navigate to the home page
            } else {
                message.error(res.data.message); // Show error message
            }
        } catch (error) {
            dispatch(hideLoading()); // Hide loading spinner in case of error
            console.log(error);
            message.error("Something went wrong"); // Show generic error message
        }
    };


    // Function to fetch doctor details


    const getDoctorInfo = async () => {
        try {
            const res = await axios.post("/api/v1/doctor/getDoctorInfo", {
                userId: params.id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Authorization header with JWT token
                }
            });

            if (res.data.success) {
                setDoctor(res.data.data); // Set the doctor data in state
            }
        } catch (error) {
            console.log(error);
        }
    };


    // Fetch doctor details when the component is mounted


    useEffect(() => {
        getDoctorInfo();
    }, []);

    return (
        <Layout>
            <h1>Manage Profile</h1>
            {doctor ? ( // Render form if doctor data is available
                <Form layout="vertical" onFinish={handleFinish} className="m-3" initialValues={{
                    ...doctor,
                    timings: [
                        moment(doctor.timings[0]).format("HH:mm"),
                        moment(doctor.timings[1]).format("HH:mm"),
                    ]
                }}>
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
                                Update
                            </button>
                        </Col>
                    </Row>
                </Form>
            ) : (
                <p>Loading doctor information...</p> // Message when doctor data is being loaded
            )}
        </Layout>
    )
}

export default Profile;
