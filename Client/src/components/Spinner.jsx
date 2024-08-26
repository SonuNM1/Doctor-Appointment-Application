
import React from 'react'

const Spinner = () => {
  return (
    <div className='d-flex justify-content-center spinner '>
        <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
        </div>
    </div>
  )
}

export default Spinner


/*

 The Spinner component is typically used to provide feedback to the user that something is loading or processing. This is crucial in a good user experience, as it prevents the user from feeling like the app is unresponsive.

*/