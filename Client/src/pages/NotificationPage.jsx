
import React from 'react'
import Layout from '../components/Layout' ; 
import {message, Tabs} from "antd" ; // Components from Ant Design (antd) used for displaying messages and creating tabs 
import {useSelector, useDispatch} from "react-redux" ; // access the Redux store and dispatch actions 
import {hideLoading, showLoading} from "../redux/features/alertSlice" ; 
import axios from "axios" ; 
import { useNavigate } from 'react-router-dom'; // navigate between routes 

const NotificationPage = () => {

    const dispatch = useDispatch() ;    // used to send actions to the Redux store 
    const navigate = useNavigate() ;    // used to navigate to different pages 

    const {user} = useSelector(state => state.user) ; 

    // Handle read notification - marks all unread notifications as read

    const handleMarkAllRead = async () => {
        try{
            dispatch(showLoading()) ;   // shows a loading spinner while the req is being processed  

            /* Sends a POST request to the server to mark all notifications as read 

            'userId' is sent in the req body to identify the user. The req inlcudes an Authorization header with a JWT token stored in localStorage, ensuring the user is authenticated.  
            */

            const res = await axios.post('/api/v1/user/get-all-notification', {userId: user._id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            dispatch(hideLoading) ; // hides the loading spinner once the request is complete 

            if(res.data.message){
                message.success(res.data.message) ;     // display a success message if the operation was successful 
            }
            else{
                message.error(res.data.message)
            }
        }
        catch(error){
            dispatch(hideLoading()) ; 
            console.log(error) ; 
            message.error('Something went wrong') ;
        }

    }

    /*
    Delete Notifications - deleting all read notifications for a user. 
    */

    const handleDeleteAllRead = async() => {
        
        try{
            dispatch(showLoading()) ; // loading spinner to indicate an operation is in progress

            // Send a POST req to delete all notifications for the current user

            const res = await axios.post('/api/v1/user/delete-all-notification', {
                userId: user._id    // Sending the user's id to identify whose notifications to delete
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`    // attach the token 
                }
            })

            dispatch(hideLoading()) ; // hiding the loading spinner once the operation is complete

            // checking if the server response indicates success, then display a success message to the user

            if(res.data.success){
                message.success(res.data.message)
            }
            else{
                message.error(res.data.message)
            }

        }catch(error){
            console.log(error) ; 
            message.error("Something went wrong in notifications");
        }

    }

  return (
    <Layout>
        <h2 className="p-3 text-center">Notification Page</h2> 

        {/* Creates a tab labeled "unRead" for unread notifications */}

        <Tabs.TabPane tab="unRead" key={0}>
            <div className='d-flex justify-content-end'>
                <h4 className='p-2' onClick={handleMarkAllRead} >Mark All Read</h4>
            </div>

            {
                user?.notification.map(notificationMsg => (
                    <div className='card' style={{cursor: "pointer"}} >
                       <div
                        className='card-text'
                        onClick={()=> {
                            navigate(notificationMsg.onClickPath)
                        }}
                       >
                            {notificationMsg.message}
                        </div>
                    </div>
                ))
            }

        </Tabs.TabPane>

        <Tabs.TabPane tab="Read" key={1}>

            {/*d-flex makes the container a flexbox, and 'justify-content-end' aligns the content to the right*/}

            <div className='d-flex justify-content-end'>

            {/*h4 element that acts as a button to delete all read notifications. The 'handleDeleteAllRead' function will delete all notifications that have been marked as "read" */}

                <h4 className='p-2 text-primary' style={{cursor: 'pointer'}}
                onClick={handleDeleteAllRead} >Delete All Read</h4>

            </div>

            {/*Displaying Read Notifications. The code uses optional chaining to safely access the 'seennotification' array from the 'user' object. This array contains all the notifications that the user has marked as read. 
            
            The 'map' function iterates over each notification in the 'seennotification' array and returns a 'div' representing each notification. 
            */}

            {

                user?.seennotification.map(notificationMsg => (
                    <div className='card' style={{cursor: "pointer"}} >
                       <div
                        className='card-text'
                        onClick={()=> {
                            navigate(notificationMsg.onClickPath)
                        }}
                       >
                            {notificationMsg.message}
                        </div>
                    </div>
                ))
            }
        </Tabs.TabPane>

    </Layout>
  )
}

export default NotificationPage




/*
Tabs.TabPane 

    - This is a component from the Ant Design ('antd') library that represents a single tab in a tabbed interface 

    - The 'tab' prop specifies the label of tab, which is 'Read' and 'unRead' here 

    - The 'key' prop uniquely identifies the tab. Here it's 0 and 1

*/