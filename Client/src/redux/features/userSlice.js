
import {createSlice} from '@reduxjs/toolkit';

// Creating a slice of the Redux store for managing user-realted state 

export const userSlice = createSlice({
    name: "user",   // name of the slice, used as a key in the Redux store
    initialState: {     // initial state of the slice 
        user: null      
    },  

    // Reducers define how the state can be updated. Reducers are functions that handle state changes in response to actions. 

    reducers: {

        // Reducer to set the user data 

        setUser: (state, action)=>{
            state.user = action.payload ; // Updating the user property in the state with the payload from the action
        }
    }
})

export const {setUser} = userSlice.actions



/*
Redux is a state management library, often used with React. It allows us to manage the application state globally, making it easier to manage data and application logic across components. 

Slices in Redux are a way to organize and manage state and the logic for manipulating that state within our application. 

Each slice typically corresponds to a feature or a piece of state, like user information, notifications. 

1. Creating a new slice using 'createSlice'

2. Adding the slice to the redux store 

3. Using the slice in components by using 'useSelector'


*/