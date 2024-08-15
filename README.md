
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
