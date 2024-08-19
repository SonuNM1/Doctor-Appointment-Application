
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

    const handleDeleteAllRead = () => {

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
            <div className='d-flex justify-content-end'>
                <h4 className='p-2' onClick={handleDeleteAllRead} >Delete All Read</h4>
            </div>
        </Tabs.TabPane>

    </Layout>
  )
}

export default NotificationPage