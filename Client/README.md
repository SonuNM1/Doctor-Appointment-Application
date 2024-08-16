

### Redux Toolkit (RTK)

- powerful library for managing state in React applications.

1. Create a Redux store 

2. Create a Slice - Slices are a way to manage part of the Redux state and actions related to that state. 

3. Providing the Redux store to our Application - Wrapping our application with the 'Provider' component from 'react-redux' and pass the store to it. 

4. Connecting Components to Redux - Use the 'useDispatch' and 'useSelector' hooks from 'react-redux' to interact with the Redux store in the components. 


* Slice - 

    It simplifies the process of managing the state and actions. 

    It represents a single piece of the redux state and the logic to manage that state. 

    A slice is essentially a collection of Redux reducer logic and actions for a specific feature or part of our application's state. 

    Each slice manages its own state and provides actions to update that state. 

* Key Components of a Slice 

    Name: The name of the slice, which is used to identify it in the redux store. 

    Initial state: The initial value of the state managed by the slice 

    Reducers: Functions that handle state changes in response to actions. These are the actual logic that updates the state. 

    Actions: Functions that are dispatched to trigger state changes. They are automatically created based on the reducer functions. 

    

### Connecting Redux to our React application 

- So that they can access and manage the global state provided by redux. This allows different parts of our application to share state and dispatch actions to update that state in a centralized manner. 

1. Create a Redux store 

2. Provide the redux store to react application 

    To make the Redux store available to our entire React application, we need to wrap our root component with the 'Provider' component from 'react-redux'. 

3. Access Redux State and Dispatch Actions in Components 

    Now that Redux is connected, we can use the 'useSelector' and 'useDispatch' hooks from 'react-redux' to interact with the Redux store in our React components. 

    useSelector - accesses the redux state (in this case, the 'loading' state from the 'alerts' slice)

    useDispatch - dispatches actions to the Redux store to update the state

- In short, 
    
    Redux Store Setup -> Provider Setup (We wrap our React application in a 'Provider' component, passing the store to it) -> Access and Dispatch (use 'useSelector' to access state and 'useDispatch' to dispatch actions)