import React from "react";
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, TimePicker } from "antd";

const ApplyDoctor = () => {
  // Handle form

  const handleFinish = (values) => {
    console.log(values);
  };

  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>

      <Form layout="vertical" onFinish={handleFinish} className="m-3">

        <h6>Personal Details</h6>

        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>

            <Form.Item label="First Name" name="firstname" required rules={[{ required: true }]}>
              <Input type="text" placeholder="Enter your first name" />
            </Form.Item>

            <Form.Item label="Last Name" name="lastname" required rules={[{ required: true }]}>
              <Input type="text" placeholder="Enter your last name" />
            </Form.Item>
            
            <Form.Item label="Phone no" name="phone" required rules={[{ required: true }]}>
              <Input type="text" placeholder="Enter your phone no" />
            </Form.Item>
            
            <Form.Item label="Email" name="email" required rules={[{ required: true }]}>
              <Input type="text" placeholder="Enter your email" />
            </Form.Item>
            
            <Form.Item label="Website" name="website" required rules={[{ required: true }]}>
              <Input type="text" placeholder="Enter your website" />
            </Form.Item>
            
            <Form.Item label="Address" name="address" required rules={[{ required: true }]}>
              <Input type="text" placeholder="Enter your address" />
            </Form.Item>
          </Col>
        </Row>

        <h6>Professional Details</h6>

        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>

            <Form.Item label="Specialization" name="specialization" required rules={[{ required: true }]}>
              <Input type="text" placeholder="Your specialization here" />
            </Form.Item>

            <Form.Item label="Experience" name="experience" required rules={[{ required: true }]}>
              <Input type="text" placeholder="Enter your experience (in yrs)" />
            </Form.Item>
            
            <Form.Item label="Fee" name="feesPerConsultation" required rules={[{ required: true }]}>
              <Input type="text" placeholder="Enter your consultation fee" />
            </Form.Item>
            
            <Form.Item label="Work timing" name="timings" required >

            <TimePicker.RangePicker/>

            </Form.Item>
            
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
                Submit
            </button>
        </div>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
