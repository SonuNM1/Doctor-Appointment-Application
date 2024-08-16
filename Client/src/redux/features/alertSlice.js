
import {createSlice} from "@reduxjs/toolkit" ; // createSlice is used to create a slice of the Redux store, which includes actions and reducers 

// Creating a slice of the Redux store. This slice is named "alerts" and it manages the "loading" state

export const alertSlice = createSlice({

    // the name of this slice, used internally by Redux 

    name: "alerts",

    // the initial state of this slice

    initialState: {
        loading: false  // Indicates whether a loading spinner or similar indicator should be shown -> 'loading' to 'false' means no loading is shown by default
    },

    // Reducers are functions that handle state changes. Reducers handles state changes based on dispatched actions. 

    reducers: {

        // Reducer to set 'loading' to 'true'

        showLoading: (state)=>{
            state.loading = true ; // This sets the loading state to true 
        },

        // Reducer to set 'loading' to false 

        hideLoading: (state)=>{
            state.loading = false ; // This sets the loading state to false 
        }
    }
})

export const {showLoading, hideLoading} = alertSlice.actions ; 


/*

1. Managing loading state - This slice helps manage the loading state of our applications. When an operation (like fetching data) is in progress, we can set the loading state to 'true' to show a loading indicator. Once the operation is complete, we can set it to 'false'

2. Modularity - By creating a separate slice for loading state, we can keep our state management modular. Each slice can manage its own part of the state and associated actions, making it easier to maintain and scale. 

3. Reusability - The 'showLoading' and 'hideLoading' actions can be dispatched from anywhere in our application where we need to indicate loading states. 

    For eg: we can dispatch 'showLoading' before making an API call and 'hideLoading' once the call is complete. 

4. Integration with components - Components can use these actions and state values to conditionally render UI elements  

*/

/*
                CONNECTING REDUX TO OUR REACT APPLICATIONS 



*/