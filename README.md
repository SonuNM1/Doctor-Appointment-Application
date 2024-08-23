
### Authorization with JWT 


- Authorization with JWT is a process used to ensure that a user has the necessary permissions to access certain resources or perfrom specific actions within an application. 

- Authentication Vs. Authorization

    Authentication is about verifying the identity of a user. It checks if the user is who they claim to be (e.g. by verifying a username and password)

    Authorization is about determining what the authenticated user is allowed to do. It checks if the user has the necessary permissions to access certain parts of the application or perform specific actions. 

- After a user is authenticated (logged in), they receive a JWT token. This token contains informaton about the user, such as their ID, roles, and permissions. 

- When the user tries to access a protected route or resource, they send this JWT token along with their request. 

- The server verifies the token to ensure it's valid and then checks the user's role/permissions encoded in the token to determine if they are authorized to access the resource. 

### Authorization with JWT includes: 

- Creating protected routes (so that only authenticated and aurthorized users can access them) 

- Middleware for JWT Verification (verifies the JWT token sent by the client, ensures that the token is valid) 

- Role Based Authorization (for eg. only users with an "admin" role can access certain routes or perform specific actions) 

- Handling Unauthorized Access 


### Authentication Process 


- When a user logs in (e.g. by entering their username and password), the backend server verifies the user's credentials. 

- If the credentials are correct, the server generates a JWT. This token is a secure way to represent the user's identity and their permissions or roles. 

- Sending the Token to the client: 

    After generating the JWT, the server sends it back to the client as part of the response. This is typically done in the body of the HTTP response, but it could also be in a header or even a cookie. 

-  Client stores the token: 

    The client then stores this token, usually in local storage, session storage, or a cookie. This token will be used to authenticate future requests made by the client. 

- Including the Token in Future requests: 

    For any requests that require authentication (e.g., accessing protected routes or resources), the client includes this token in the 'Authorization' header. 

    The server checks this token to verify that the request is coming from an authenticated user. 


### Process Flow of JWT (with example)


1. Login request - 

    Client: Sends a POST request with username and password to the login endpoint 

    Server: validates credentials and generates a JWT token 

2. Sending the Token - 

    Server: responds with the JWT token

3. Client stores the token for future use 

4. Making Authenticated Requests - 

    Client: Sends request to protected routes, including the token in the 'Authorization' header

    Server: Validates the token, and if valid, processes the request



### Why clear the localStorage (localStorage.clear())


- If the API request to fetch user data fails or returns a response indicating that the request was unsuccessful ("res.data.success" if "false"), this suggests that the token stored in 'localStorage' might be invalid, expired, or no longer associated with a valid user session. 

- By clearing 'localStorage', the app removes the potentially invalid or corrupted token, preventing further unauthorized or erroneous requests taht might rely on that token. 

- If there's an error in the process of making the API request (a network error, server issue, or an invalid token), it's safer to clear 'localStorage'. The error could mean that the current session is no longer valid. 

- Clearing 'localStorage' in this context ensures that the app doesn't hold onto a potentially invalid token. This forces the user to authenticate again, which helps maintain security and ensures that the user is interacting with the application in a valid state. 




### Incorrect Time Format Handling in Form Submission || Moment.js 



- Earlier, the 'TimePicker.RangePicker' in our form was handling time values as 'moment' objects, but when we sent the form data to our backend, we weren't formatting these 'moment' objects into a string format that our backend can process (like "HH:mm"). This caused issue when trying to update the doctor's work timings. 

- Form Submission handling: 

    const res = await axios.post("/api/v1/doctor/updateProfile",
    { 
        ...values, 
        userId: user._id, 
        timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm")
        ] 
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
    }
);


    * Spread Operator (...values) : This takes all the form values and includes them in the data sent to the backend 

    * User ID ('userId:user._id')  : This ensures that the doctor profile being updated corresponds to the correct user 


- Timings Formatting: 

    * 'values.timings[0]' and 'values.timings[1]' are 'moment' objects representing the start and end times selected in the 'TimePicker.RangePicker'

    * The 'moment().format("HH:mm")' method converts these 'moment' objects into strings in the "HH:mm" format, which is a standard time format ("14:30" for 2:30PM)

    * This ensures that the timings are sent to the backend as strings, not as 'moment' objects, which our backend can easily store and process. 



- Setting Initial Values in the Form 

<Form 
    layout="vertical" 
    onFinish={handleFinish} 
    className="m-3" 
    initialValues={{
        ...doctor,
        timings: [
            moment(doctor.timings[0]).format("HH:mm"),
            moment(doctor.timings[1]).format("HH:mm"),
        ]
    }}>


* 'initialValue' is an object that pre-populates the form fields with the existing doctor data

* moment(doctor.timings[0]).format("HH:mm") ensures that these initial timings are formatted correctly when the form is loaded.



- Before using 'npm i moment' the form and backend weren't communicating the time data in a consistent format, leading to problems when updating the doctor's profile 

- By ensuring that the form's time values are always in the "HH:mm" format both when initializing the form and when sending data to the backend, the issue is resolved. 

