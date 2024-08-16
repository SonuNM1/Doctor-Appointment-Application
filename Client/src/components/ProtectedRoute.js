import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // useSelector -> used to extract data from the Redux store
                                                        // useDispatch -> dispatch actions to the redux store. Actions like 'showLoading', 'hideLoading' and 'setUser' are dispatched to manage state changes 
                                                        
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../redux/features/userSlice";

/*
The function checks if a 'token' is stored in 'localStorage'.

This token typically represents the user
s authenticated session and would be set after a successful login. 

If the token is found in 'localStorage', it means the user is authenticated. 

The component then returns the 'children' prop, which contains the components that should be rendered if the user is authenticated (e.g. the homepage or other protected routes)
*/

function ProtectedRoute({ children }) {
  const dispatch = useDispatch(); // dispatch actions to the Redux store

  const { user } = useSelector((state) => state.user); // extracts the 'user' state from the Redux store.

  // GET user

  const getUser = async () => {
    try {
      dispatch(showLoading()); // show loading indicator

      // Make an API request to get user data

      const res = await axios.post(
        "/api/v1/user/getUserData",
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      /* If the API response is successful, the user's data is stored in the Redux store using the 'setUser' action */

      if (res.data.success) {
        dispatch(setUser(res.data.data)); // set the user data in the Redux store 
      } else {
        <Navigate to="/login" />;   // redirect to login if the user data couldn't be fetched 
        localStorage.clear();     // clear any stored data 
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();   // clear any stored data 
      console.log(error);
    }
  };

  /*
  This hook runs the 'getUser' function when the 'ProtectedRoute' component mounts, but only if the 'user' is not already set in the Redux store. 
  */

  useEffect(() => {
    if (!user) {
      getUser();    // Fetch user data if it's not already available in the Redux store 
    }
  }, [user, getUser]);

  // Check if there is a token stored in the localStorage ( this indicates the user is authenticated)

  if (localStorage.getItem("token")) {
    // If token exists, render the child components (i.e. the protected content)

    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;

/*

The homepage or any other sensitive information should only be accessible to authenticated users. To achieve this, we should protect our routes, particularly the homepage, by making sure only logged-in users can access them. 

Steps to Protect the Homepage 

1. Create a private route component 

    This component will check if the user is authenticated (i.e. if they have a valid token )

    If the user is not authenticated, they will be redirected to the login page

2. Use the Private route component for the homepage

    Replace the direct access to the homepage with a protected route that only allows access if the user is authenticated 

*/

/*                  THE CONCEPT OF CHILDREN IN REACT 

In React, `children` is a special prop that is automatically passed to every component. It represents the content nested between the opening and closing tags of a component. 


function WrapperComponent({ children }) {
  return (
    <div className="wrapper">
      {children}
    </div>
  );
}

function App() {
  return (
    <WrapperComponent>
      <h1>Hello, World!</h1>
      <p>This is a paragraph inside the wrapper.</p>
    </WrapperComponent>
  );
}

WrapperComponent:

   This is a React component that takes `children` as a prop.
   
   Whatever is placed between the opening and closing tags of `WrapperComponent` in the JSX will be passed as the `children` prop.

Usage in `App`:

   In the `App` component, `WrapperComponent` is used, and within its tags, there is an `<h1>` and a `<p>`.
   
   These elements are passed to `WrapperComponent` as the `children` prop.

Rendering:
   
Inside `WrapperComponent`, `{children}` is rendered, which will output the `<h1>` and `<p>` elements wrapped in a `div` with a class of "wrapper."

So in this case, `children` refers to `<h1>Hello, World!</h1>` and `<p>This is a paragraph inside the wrapper.</p>`.


Applying This to `ProtectedRoute`


In the `ProtectedRoute` component you shared earlier, `children` represents whatever component(s) you wrap inside `ProtectedRoute`.

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function ProtectedRoute({ children }) {
    if (localStorage.getItem("token")) {
        return children; // Render the children if the user is authenticated
    } else {
        return <Navigate to="/login" />; // Otherwise, redirect to the login page
    }
}

export default ProtectedRoute;


How It Works:


`ProtectedRoute` Component:

    The `ProtectedRoute` component takes `children` as a prop. `children` represents whatever component(s) are wrapped by `ProtectedRoute`.

Using `ProtectedRoute` in `App.js`:
  
   <Route
     path="/"
     element={
       <ProtectedRoute>
         <HomePage />
       </ProtectedRoute>
     }
   />
   
Here, `HomePage` is passed as `children` to `ProtectedRoute`.

If the user is authenticated (i.e., there’s a token in `localStorage`), `ProtectedRoute` will render `HomePage`.

If the user is not authenticated, `ProtectedRoute` will redirect them to the login page instead.


Why Use `children`?


Using `children` allows you to create reusable components that can wrap and conditionally render any content you place inside them. This pattern is common for things like layouts, wrappers, or in this case, route protection.

This makes your code more flexible and modular since the `ProtectedRoute` can be used to protect any component, not just `HomePage`, without needing to modify the `ProtectedRoute` component itself.

*/

/*

const res = await axios.post('/api/v1/user/getUserData', {
          token: localStorage.getItem("token")},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }) ;


Why use Tokens ?

- After a user logs in, the server generates a token (like a JWT) and sends it back to the client (browser)

- Instead of keeping the user logged in via traditional session cookies, many modern applications use tokens to manage sessions. 


Storing the Token 


- LocalStorage: Once the client receives the token from the server, it needs to store it somewhere so it can use it in future requests. 

  'localStorage' is a common place to store this token because it persists even after the browser is closed (unlike 'sessionStorage', which clears after the session ends )
  
- while 'localStorage' is convenient, it has some security concerns, such as being vulnerable to XSS(Cross-Site Scripting) attacks. 


Making Authenticated Requests 


- When we make a request to a secure API endpoint (like /api/v1/user/getUserData), we need to prove to the server that we are an authenticated user. This is done by including the token we stored earlier in the request. 


Authorization Header 


- Bearer Token: The 'Authorization' heaer is where the token is sent. The format 'Bearer <token>' is a common pattern where "Bearer" is a keyword that indicates the type of token, and <token> is the actual token String. 


Why include the Token in the Header?


- Security: The server checks this token to validate the request. If the token is valid (it hasn't expired, hasn't been tampered with), the server processes the request and returns the data. If the token is invalid, the server denies the request, usually with a 401 unauthorized status. 


* By including token in the 'Authorization' header, we're ensuring that our request to get user data is authenticated and secure. Without this token, the server would likely reject the request, as it wouldn't know who is making the request or if they are authorized to access the resource. 

*/
